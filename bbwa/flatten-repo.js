#!/usr/bin/env node

/**
 * Script to flatten the GitHub repository structure
 * Moves all files from nested bbwa/ directory to root level
 */

const { Octokit } = require('@octokit/rest')
const path = require('path')
const fs = require('fs').promises

// Configuration
const GITHUB_TOKEN = process.env.GITHUB_TOKEN // You'll need to set this
const OWNER = 'coastalprograms'
const REPO = 'bbwa'
const SOURCE_PATH = 'bbwa'
const BRANCH = 'main'

async function flattenRepository() {
  if (!GITHUB_TOKEN) {
    console.log('❌ GITHUB_TOKEN environment variable is required')
    console.log('Please set your GitHub personal access token:')
    console.log('export GITHUB_TOKEN=your_token_here')
    return
  }

  const octokit = new Octokit({ auth: GITHUB_TOKEN })

  try {
    console.log('🔍 Analyzing repository structure...')

    // Get the current repository contents
    const { data: rootContents } = await octokit.rest.repos.getContent({
      owner: OWNER,
      repo: REPO,
      path: '',
      ref: BRANCH
    })

    // Check if bbwa directory exists
    const bbwaDir = rootContents.find(item => item.name === 'bbwa' && item.type === 'dir')
    if (!bbwaDir) {
      console.log('✅ Repository structure is already flat - no bbwa directory found')
      return
    }

    console.log('📁 Found nested bbwa directory - proceeding with flattening...')

    // Get all files recursively from bbwa directory
    const nestedFiles = await getAllFilesRecursively(octokit, OWNER, REPO, SOURCE_PATH, BRANCH)
    
    console.log(`📋 Found ${nestedFiles.length} files to move`)

    // Create a new branch for the flattening operation
    const flattenBranch = 'flatten-repository-structure'
    
    try {
      // Get main branch reference
      const { data: mainBranch } = await octokit.rest.git.getRef({
        owner: OWNER,
        repo: REPO,
        ref: 'heads/main'
      })

      // Create new branch
      await octokit.rest.git.createRef({
        owner: OWNER,
        repo: REPO,
        ref: `refs/heads/${flattenBranch}`,
        sha: mainBranch.object.sha
      })
      
      console.log(`✅ Created branch: ${flattenBranch}`)
    } catch (error) {
      if (error.status === 422) {
        console.log(`📝 Branch ${flattenBranch} already exists - using existing branch`)
      } else {
        throw error
      }
    }

    // Move files to root level
    for (const file of nestedFiles) {
      const newPath = file.path.replace(`${SOURCE_PATH}/`, '')
      
      if (newPath === file.path) continue // Skip if already at root
      
      console.log(`📄 Moving: ${file.path} → ${newPath}`)

      // Get file content
      const { data: fileData } = await octokit.rest.repos.getContent({
        owner: OWNER,
        repo: REPO,
        path: file.path,
        ref: flattenBranch
      })

      // Create file at new location
      await octokit.rest.repos.createOrUpdateFileContents({
        owner: OWNER,
        repo: REPO,
        path: newPath,
        message: `Move ${file.path} to root level`,
        content: fileData.content,
        branch: flattenBranch
      })

      // Delete old file
      await octokit.rest.repos.deleteFile({
        owner: OWNER,
        repo: REPO,
        path: file.path,
        message: `Remove old nested file: ${file.path}`,
        sha: fileData.sha,
        branch: flattenBranch
      })

      // Add small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100))
    }

    // Delete the empty bbwa directory structure
    console.log('🗑️ Cleaning up empty nested directory...')
    await deleteDirectoryRecursively(octokit, OWNER, REPO, SOURCE_PATH, flattenBranch)

    console.log('\n🎉 Repository flattening completed!')
    console.log(`📍 Branch: ${flattenBranch}`)
    console.log(`🔗 Create PR: https://github.com/${OWNER}/${REPO}/compare/main...${flattenBranch}`)

  } catch (error) {
    console.error('❌ Error flattening repository:', error.message)
    if (error.status) {
      console.error(`HTTP Status: ${error.status}`)
    }
  }
}

async function getAllFilesRecursively(octokit, owner, repo, path, branch, allFiles = []) {
  const { data: contents } = await octokit.rest.repos.getContent({
    owner,
    repo,
    path,
    ref: branch
  })

  for (const item of contents) {
    if (item.type === 'file') {
      allFiles.push(item)
    } else if (item.type === 'dir') {
      await getAllFilesRecursively(octokit, owner, repo, item.path, branch, allFiles)
    }
  }

  return allFiles
}

async function deleteDirectoryRecursively(octokit, owner, repo, dirPath, branch) {
  try {
    const { data: contents } = await octokit.rest.repos.getContent({
      owner,
      repo,
      path: dirPath,
      ref: branch
    })

    // If directory is not empty, it means some files weren't moved
    if (contents.length === 0) {
      console.log(`✅ Directory ${dirPath} is empty - it should be automatically cleaned up`)
    } else {
      console.log(`⚠️ Directory ${dirPath} still contains ${contents.length} items - manual cleanup may be required`)
    }
  } catch (error) {
    console.log(`✅ Directory ${dirPath} has been cleaned up`)
  }
}

// Run the script
if (require.main === module) {
  flattenRepository()
}

module.exports = { flattenRepository }