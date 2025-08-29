# Compliance Alert Automation Setup

## Overview

This document provides setup instructions for creating automation workflows that process real-time compliance alerts when workers with expired white cards attempt to check in.

## Webhook Payload Structure

When a compliance alert is triggered, the system sends a webhook with this payload:

```json
{
  "workerId": "uuid-string",
  "workerName": "John Smith",
  "workerEmail": "john.smith@example.com",
  "siteId": "uuid-string",
  "siteName": "Main Construction Site",
  "reason": "Expired white card",
  "occurredAt": "2025-08-20T10:30:00.000Z",
  "type": "compliance_alert",
  "timestamp": "2025-08-20T10:30:00.000Z"
}
```

## Security

The webhook includes an HMAC signature in the `X-Signature` header:

```
X-Signature: sha256=abc123def456...
```

**Always verify this signature before processing the webhook.**

## Make.com Setup

### 1. Create New Scenario

1. Log into Make.com
2. Create new scenario
3. Add "Webhooks > Custom webhook" as trigger

### 2. Webhook Configuration

1. Copy the webhook URL provided by Make.com
2. Set this as `AUTOMATION_WEBHOOK_URL` in your environment
3. Generate a strong secret and set as `AUTOMATION_WEBHOOK_SECRET`

### 3. Signature Verification Module

Add a "Tools > Set variable" module after the webhook:

```javascript
// Verify HMAC signature
const crypto = require('crypto');
const body = JSON.stringify({{1.`data`}});
const secret = 'YOUR_WEBHOOK_SECRET'; // Store in Make.com settings
const expectedSignature = crypto.createHmac('sha256', secret).update(body).digest('hex');
const providedSignature = {{1.headers.`X-Signature`}}.replace('sha256=', '');

if (expectedSignature !== providedSignature) {
    throw new Error('Invalid signature');
}

// Continue with payload processing
{{1.`data`}}
```

### 4. Email Module

Add "Email > Send an email" module:

**To:** Builder email address (configure in settings)
**Subject:** `🚨 URGENT: Expired White Card Alert - {{workerId}}`
**Content:**
```html
<h2>Compliance Alert</h2>
<p><strong>Worker:</strong> {{workerName}} ({{workerEmail}})</p>
<p><strong>Issue:</strong> {{reason}}</p>
<p><strong>Site:</strong> {{siteName}}</p>
<p><strong>Time:</strong> {{occurredAt}}</p>
<p><strong>Action Required:</strong> This worker has been denied site access and needs immediate attention.</p>
<p><a href="https://your-app.netlify.app/admin/workers">View Workers →</a></p>
```

### 5. SMS Module

Add "SMS > Send SMS" module (using provider like Twilio):

**To:** Builder phone number (configure in settings)
**Message:**
```
🚨 BBWA ALERT: {{workerName}} denied entry to {{siteName}} - {{reason}}. Check admin panel immediately.
```

### 6. Error Handling

Add error handling modules:
- Set retry attempts (3-5 retries)
- Add exponential backoff delays
- Log failures to external service

## n8n Setup

### 1. Create New Workflow

1. Open n8n interface
2. Create new workflow
3. Add "Webhook" node as trigger

### 2. Webhook Configuration

1. Set webhook node to "POST" method
2. Copy the webhook URL
3. Set authentication to "Header Auth"
4. Header name: `X-Signature`

### 3. Signature Verification

Add "Function" node after webhook:

```javascript
// Verify HMAC signature
const crypto = require('crypto');
const body = JSON.stringify($json);
const secret = $env.WEBHOOK_SECRET;
const expectedSignature = crypto.createHmac('sha256', secret).update(body).digest('hex');
const providedSignature = $headers['x-signature'].replace('sha256=', '');

if (expectedSignature !== providedSignature) {
    throw new Error('Invalid webhook signature');
}

return { verified: true, data: $json };
```

### 4. Email Node

Add "Send Email" node:

**To:** Builder email (from environment or settings)
**Subject:** `🚨 URGENT: Compliance Alert - ${$json.workerName}`
**HTML:**
```html
<h2>Compliance Alert</h2>
<p><strong>Worker:</strong> ${$json.workerName} (${$json.workerEmail})</p>
<p><strong>Issue:</strong> ${$json.reason}</p>
<p><strong>Site:</strong> ${$json.siteName}</p>
<p><strong>Time:</strong> ${$json.occurredAt}</p>
<p><strong>Action Required:</strong> This worker has been denied site access.</p>
<p><a href="https://your-app.netlify.app/admin/workers">Manage Workers</a></p>
```

### 5. SMS Node

Add SMS node (Twilio/other provider):

**Message:**
```
🚨 BBWA: ${$json.workerName} denied entry to ${$json.siteName} - ${$json.reason}. Check admin panel.
```

### 6. Error Handling

Configure error workflows:
- Set retry settings on each node
- Add error notification paths
- Log to monitoring service

## Environment Variables

Set these variables in your hosting environment:

```env
# Automation webhook configuration
AUTOMATION_WEBHOOK_URL=https://hook.make.com/your-webhook-url
# OR
AUTOMATION_WEBHOOK_URL=https://your-n8n-instance.com/webhook/your-webhook-id

# Webhook security
AUTOMATION_WEBHOOK_SECRET=your-strong-secret-key-here
```

## Testing

### 1. Manual Test

Trigger a test webhook:

```bash
curl -X POST https://your-webhook-url \
  -H "Content-Type: application/json" \
  -H "X-Signature: sha256=$(echo -n '{"test":"data"}' | openssl dgst -sha256 -hmac 'your-secret' -binary | xxd -p -c 256)" \
  -d '{"workerId":"test","workerName":"Test Worker","workerEmail":"test@example.com","reason":"Expired white card","occurredAt":"2025-08-20T10:30:00.000Z","type":"compliance_alert"}'
```

### 2. Application Test

1. Create a worker with expired white card
2. Attempt check-in via the app
3. Verify webhook is triggered
4. Check email and SMS delivery
5. Verify audit logs in database

## Monitoring

### Database Monitoring

Check notification audit logs:

```sql
SELECT 
  kind,
  payload,
  result,
  created_at
FROM notification_audits 
WHERE kind = 'compliance_alert'
ORDER BY created_at DESC
LIMIT 10;
```

### Rate Limiting

Check deduplication records:

```sql
SELECT 
  worker_id,
  type,
  created_at
FROM notification_dedup 
WHERE type = 'compliance_alert'
ORDER BY created_at DESC;
```

### Webhook Health

Monitor webhook delivery success rates and implement alerting for failures.

## Troubleshooting

**Webhook not triggered:**
- Check environment variables are set
- Verify worker has expired white card
- Check rate limiting (max 1 alert per hour per worker)

**Signature verification fails:**
- Ensure secret matches in both systems
- Verify JSON payload is identical
- Check header format: `sha256=hash`

**Email/SMS not delivered:**
- Check provider credentials in automation platform
- Verify email addresses and phone numbers
- Check automation platform logs

**High rate limiting:**
- Review deduplication logic
- Adjust time window if necessary
- Check for spam or repeated check-in attempts