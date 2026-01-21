# CloudWatch Logging Setup for Barter Dev

## ✅ What's Configured

### 1. Structured Logging
- Created centralized logger utility (`src/lib/logger.ts`)
- JSON-formatted logs for easy CloudWatch parsing
- Request ID tracking for tracing user journeys
- Context-aware logging (API, Database, Auth, Email)

### 2. Enhanced Error Tracking
- Detailed validation error logging
- Full request/response logging
- Stack traces for all errors
- User context (IP, user-agent, referer)

---

## 📊 How to View Logs in CloudWatch

### Option 1: AWS Console
1. Go to: https://console.aws.amazon.com/cloudwatch/
2. Click **Logs** → **Log groups**
3. Find: `/aws/lambda/us-east-1.d2c1w3ga1c6ojg_main_*`
4. Click on a log stream to view logs

### Option 2: AWS CLI
```bash
# Get recent logs (LIVE TAIL)
aws logs tail /aws/amplify/barter-dev/application-logs --follow

# Search for errors
aws logs filter-log-events \
  --log-group-name "/aws/amplify/barter-dev/application-logs" \
  --filter-pattern "ERROR"

# Search for validation failures
aws logs filter-log-events \
  --log-group-name "/aws/amplify/barter-dev/application-logs" \
  --filter-pattern "Validation failed"

# Search for database errors
aws logs filter-log-events \
  --log-group-name "/aws/amplify/barter-dev/application-logs" \
  --filter-pattern '{ $.context = "DATABASE" && $.level = "ERROR" }'
```

---

## 🔍 Log Structure

All logs are in JSON format for easy parsing:

```json
{
  "timestamp": "2026-01-21T20:45:00.000Z",
  "level": "ERROR",
  "context": "API",
  "message": "Validation failed",
  "data": {
    "requestId": "req_1234567890_abc123",
    "body": { ... },
    "fieldErrors": { ... }
  }
}
```

---

## 🎯 Key Log Events to Monitor

### 1. Form Validation Errors
**Filter**: `{ $.message = "Validation failed" }`

Shows which fields are failing validation and why.

### 2. Application Submissions
**Filter**: `{ $.message = "New application submission started" }`

Track all submission attempts with user context.

### 3. Database Errors
**Filter**: `{ $.context = "DATABASE" && $.level = "ERROR" }`

MongoDB connection or query issues.

### 4. Rate Limiting
**Filter**: `{ $.message = *"rate limit"* }`

Users hitting submission limits.

---

## 📈 Create CloudWatch Dashboards

### Quick Dashboard Setup:
```bash
# Create a dashboard for application monitoring
aws cloudwatch put-dashboard \
  --dashboard-name "BarterDevApplications" \
  --dashboard-body file://cloudwatch-dashboard.json
```

### Metrics to Track:
1. **Submission Rate**: Count of successful submissions
2. **Error Rate**: Count of failed submissions
3. **Validation Failures**: By field
4. **Response Times**: API latency

---

## 🔔 Set Up Alarms

### Create Alarm for High Error Rate:
```bash
aws cloudwatch put-metric-alarm \
  --alarm-name "BarterDev-HighErrorRate" \
  --alarm-description "Alert when error rate exceeds 10%" \
  --metric-name Errors \
  --namespace AWS/Lambda \
  --statistic Sum \
  --period 300 \
  --threshold 10 \
  --comparison-operator GreaterThanThreshold \
  --evaluation-periods 1
```

---

## 🐛 Debugging Form Submission Issues

### Step 1: Find the Request
```bash
# Search for recent validation failures
aws logs filter-log-events \
  --log-group-name "/aws/lambda/us-east-1.d2c1w3ga1c6ojg_main_api-apply" \
  --filter-pattern "Validation failed" \
  --start-time $(date -u -d '1 hour ago' +%s)000
```

### Step 2: Get Full Request Context
Look for the `requestId` in the logs, then search for all logs with that ID:
```bash
aws logs filter-log-events \
  --log-group-name "/aws/lambda/us-east-1.d2c1w3ga1c6ojg_main_api-apply" \
  --filter-pattern "req_1234567890_abc123"
```

### Step 3: Analyze the Error
The logs will show:
- What data the user submitted
- Which validation rules failed
- User's browser/device info
- Timestamp and IP address

---

## 📊 Common Issues to Look For

### 1. Website Field Validation
**Symptom**: Users leaving website field empty or entering invalid URLs

**Log Pattern**:
```json
{
  "fieldErrors": {
    "website": ["Please enter a valid URL..."]
  }
}
```

**Fix**: Already deployed - website field now properly handles empty values

### 2. Rate Limiting
**Symptom**: Users submitting multiple times

**Log Pattern**:
```json
{
  "message": "Rate limit exceeded",
  "email": "user@example.com"
}
```

### 3. MongoDB Connection Issues
**Symptom**: Intermittent 500 errors

**Log Pattern**:
```json
{
  "context": "DATABASE",
  "level": "ERROR",
  "message": "Connection failed"
}
```

---

## 🚀 What's Deployed

✅ Enhanced logging in `/api/apply`  
✅ Request ID tracking  
✅ Structured JSON logs  
✅ Full error context  
✅ User information capture  

**Logs are automatically sent to CloudWatch** - no additional configuration needed!

---

## 📞 Quick Commands

```bash
# Watch live logs
aws logs tail /aws/amplify/barter-dev/application-logs --follow

# Get last hour of errors
aws logs filter-log-events \
  --log-group-name "/aws/amplify/barter-dev/application-logs" \
  --filter-pattern "ERROR" \
  --start-time $(date -u -d '1 hour ago' +%s)000

# Count validation failures today
aws logs filter-log-events \
  --log-group-name "/aws/amplify/barter-dev/application-logs" \
  --filter-pattern "Validation failed" \
  --start-time $(date -u -d 'today' +%s)000 \
  | grep -c "Validation failed"

# View database operations
aws logs filter-log-events \
  --log-group-name "/aws/amplify/barter-dev/application-logs" \
  --filter-pattern '{ $.context = "DATABASE" }'

# Check rate limiting
aws logs filter-log-events \
  --log-group-name "/aws/amplify/barter-dev/application-logs" \
  --filter-pattern "Rate limit"
```

---

**Need help analyzing specific errors?** Share the CloudWatch logs and I'll help debug!

