# Environment Configuration Migration Guide

**IMPORTANT:** The BBWA environment configuration has been consolidated and improved. This guide helps you migrate from the old scattered `.env` files to the new unified system.

## What Changed

### Before (Old System)
- ❌ `apps/web/.env.example` (46 lines)
- ❌ `apps/web/.env.example.compliance` (15 lines)  
- ❌ `supabase/functions/expiry-reminders/.env.example` (18 lines)
- ❌ Multiple configuration locations
- ❌ No validation or setup guidance

### After (New System)
- ✅ Single `.env.example` at root (comprehensive)
- ✅ Built-in validation with `npm run env:validate`
- ✅ Interactive setup wizard with `npm run env:setup`
- ✅ Clear documentation and troubleshooting
- ✅ Hierarchical variable organization (Critical/Important/Optional)

## Migration Steps

### Option 1: Quick Migration (Recommended)

```bash
# 1. Backup your current configuration
cp .env.local .env.local.backup

# 2. Run the interactive setup wizard
npm run env:setup

# 3. Validate new configuration
npm run env:validate

# 4. Test the application
npm run dev
```

The interactive wizard will detect your existing values and guide you through the new structure.

### Option 2: Manual Migration

```bash
# 1. Backup existing files
cp .env.local .env.local.backup
cp apps/web/.env.local apps/web/.env.local.backup 2>/dev/null || true

# 2. Copy new template
cp .env.example .env.local

# 3. Edit .env.local with your existing values (see mapping below)

# 4. Validate configuration
npm run env:validate
```

## Variable Mapping Reference

### Core Supabase Variables
| Old Variable | New Variable | Location Change |
|-------------|-------------|----------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `NEXT_PUBLIC_SUPABASE_URL` | ✅ Same |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ Same |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | ✅ Same |
| `SUPABASE_SERVICE_ROLE_KEY` | `SUPABASE_SERVICE_ROLE_KEY` | ✅ Same |

### AI Configuration
| Old Variable | New Variable | Notes |
|-------------|-------------|-------|
| `AI_PROVIDER` | `AI_PROVIDER` | ✅ Same |
| `GEMINI_API_KEY` | `GEMINI_API_KEY` | ✅ Same |
| `OPENAI_API_KEY` | `OPENAI_API_KEY` | ✅ Same |

### Google Maps
| Old Variable | New Variable | Notes |
|-------------|-------------|-------|
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | ✅ Same |

### Session & Security
| Old Variable | New Variable | Notes |
|-------------|-------------|-------|
| `SESSION_SECRET` | `SESSION_SECRET` | ✅ Same |

### Compliance Webhooks (from .env.example.compliance)
| Old Variable | New Variable | Notes |
|-------------|-------------|-------|
| `AUTOMATION_WEBHOOK_URL` | `AUTOMATION_WEBHOOK_URL` | 🔄 Consolidated |
| `AUTOMATION_WEBHOOK_SECRET` | `AUTOMATION_WEBHOOK_SECRET` | 🔄 Consolidated |

### FAQ & Airtable
| Old Variable | New Variable | Notes |
|-------------|-------------|-------|
| `FAQ_SOURCE` | `FAQ_SOURCE` | ✅ Same |
| `FAQ_LIMIT` | `FAQ_LIMIT` | ✅ Same |
| `AIRTABLE_API_KEY` | `AIRTABLE_API_KEY` | ✅ Same |
| `AIRTABLE_BASE_ID` | `AIRTABLE_BASE_ID` | ✅ Same |
| `AIRTABLE_TABLE` | `AIRTABLE_FAQ_TABLE` | 🔄 Renamed |
| `AIRTABLE_VIEW` | `AIRTABLE_VIEW` | ✅ Same |
| `AIRTABLE_FIELDS_*` | `AIRTABLE_FIELDS_*` | ✅ Same |

### Edge Function Variables (Moved to Supabase Secrets)
These variables should now be set as Supabase Function secrets instead of local env:

| Old Variable | New Method | Command |
|-------------|------------|---------|
| Edge Function `SUPABASE_URL` | Auto-provided | N/A |
| Edge Function `SUPABASE_SERVICE_ROLE_KEY` | Auto-provided | N/A |
| `AUTOMATION_PROVIDER` | Function secret | `supabase functions env set AUTOMATION_PROVIDER=make` |
| `MAKE_WEBHOOK_URL` | Function secret | `supabase functions env set MAKE_WEBHOOK_URL=your_url` |
| `N8N_WEBHOOK_URL` | Function secret | `supabase functions env set N8N_WEBHOOK_URL=your_url` |
| `INDUCTION_URL` | Function secret | `supabase functions env set INDUCTION_URL=your_url` |
| `BUILDER_ALERT_EMAIL` | Function secret | `supabase functions env set BUILDER_ALERT_EMAIL=admin@domain.com` |
| `BUILDER_ALERT_PHONE` | Function secret | `supabase functions env set BUILDER_ALERT_PHONE=+61400000000` |

## Clean Up Old Files

After successful migration, you can remove the old configuration files:

```bash
# Remove old environment examples (keep backups!)
rm apps/web/.env.example
rm apps/web/.env.example.compliance
rm supabase/functions/expiry-reminders/.env.example

# Remove old app-level env file if it exists
rm apps/web/.env.local 2>/dev/null || true
```

**Note:** Keep your backup files (`.env.local.backup`) until you've thoroughly tested the new configuration.

## Validation & Testing

### 1. Validate Configuration
```bash
npm run env:validate
```

Expected output:
- ✅ All critical variables configured
- ⚠️ Any missing optional features clearly marked
- 📋 Setup commands for missing variables

### 2. Test Application Startup
```bash
npm run dev
```

Should start without errors and show:
- Next.js development server on port 3000
- No Supabase connection errors
- All configured features working

### 3. Test Key Features

**Database Connection:**
Visit `http://localhost:3000/db-check` to verify Supabase connectivity.

**Admin Dashboard:**
Visit `http://localhost:3000/admin` to test authentication and admin features.

**Maps Integration:**
Check public website pages with service area maps.

**AI Generation:**
Test project description generation in admin dashboard (if configured).

## Troubleshooting Migration Issues

### Issue: "Missing Supabase env vars" Error

**Cause:** Critical Supabase variables not properly migrated.

**Solution:**
```bash
# Check current values
npm run env:validate

# Re-run setup wizard to fix
npm run env:setup
```

### Issue: Features Not Working After Migration

**Cause:** Optional variables not migrated or incorrectly formatted.

**Solution:**
1. Compare `.env.local.backup` with new `.env.local`
2. Check variable names against mapping table above
3. Run `npm run env:validate` for specific guidance

### Issue: Edge Functions Not Working

**Cause:** Edge Function variables need to be set as Supabase secrets, not local env.

**Solution:**
```bash
# Set Edge Function secrets
supabase functions env set --project-id YOUR_PROJECT VARIABLE_NAME=value

# Example:
supabase functions env set --project-id abc123 AUTOMATION_PROVIDER=make
supabase functions env set --project-id abc123 INDUCTION_URL=https://yourdomain.com/induction
```

### Issue: Webhook Alerts Not Working

**Cause:** Webhook configuration consolidated but not properly migrated.

**Solution:**
1. Check `.env.local.backup` for `AUTOMATION_WEBHOOK_*` values
2. Add to new `.env.local` file:
   ```bash
   AUTOMATION_WEBHOOK_URL=your_webhook_url
   AUTOMATION_WEBHOOK_SECRET=your_webhook_secret
   ```
3. Validate: `npm run env:validate`

## Rollback Plan

If you encounter issues with the new configuration:

### 1. Restore Previous Configuration
```bash
# Restore main env file
cp .env.local.backup .env.local

# Restore app-level env if it existed
cp apps/web/.env.local.backup apps/web/.env.local 2>/dev/null || true

# Restart development server
npm run dev
```

### 2. Report Issues
If you need to rollback, please report the issue with:
- What went wrong
- Error messages
- Your configuration (with secrets redacted)
- Steps that led to the problem

### 3. Gradual Migration
You can migrate gradually by:
1. Starting with just critical variables
2. Testing each feature group separately
3. Adding optional variables one by one

## Benefits After Migration

### For Developers
- ✅ Single source of truth for all configuration
- ✅ Built-in validation prevents common setup errors
- ✅ Interactive setup wizard for new team members
- ✅ Clear documentation for every variable
- ✅ Hierarchical organization (critical → important → optional)

### For Teams
- ✅ Consistent configuration across all environments
- ✅ Reduced onboarding time for new developers
- ✅ Better security with proper variable scoping
- ✅ Automated environment health checks

### For Operations
- ✅ Easier deployment configuration
- ✅ Clear separation of development vs production values
- ✅ Better error messages and troubleshooting guidance
- ✅ Validation scripts for CI/CD pipelines

## Need Help?

1. **Run diagnostics:** `npm run env:validate`
2. **Interactive setup:** `npm run env:setup`
3. **Check documentation:** `docs/environment-setup.md`
4. **Compare configurations:** Use your `.env.local.backup` as reference

The new system is designed to make environment configuration seamless and error-free. Take your time with the migration and don't hesitate to use the validation tools!