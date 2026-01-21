# MongoDB Logging System

## ✅ What's Configured

Your app now saves important logs to MongoDB in addition to CloudWatch!

### Logs Collection: `logs`
All important events are saved to MongoDB for long-term analysis and debugging.

---

## 📊 What Gets Logged to MongoDB

### ✅ Always Logged:
1. **Errors** - All errors with full stack traces
2. **Warnings** - All warnings
3. **Application submissions** - User form submissions
4. **Database operations** - Creates, updates, deletes
5. **Rate limiting** - When users hit limits

### ⏭️ Skipped (CloudWatch Only):
- Debug logs in production
- Routine info logs without importance
- Connection pools and health checks

---

## 🔍 Log Structure in MongoDB

```json
{
  "_id": ObjectId("..."),
  "timestamp": ISODate("2026-01-21T20:50:00.000Z"),
  "level": "error",
  "context": "API",
  "message": "Validation failed",
  "data": {
    "requestId": "req_1234567890_abc123",
    "email": "user@example.com"
  },
  "requestId": "req_1234567890_abc123",
  "ipAddress": "192.168.1.1",
  "userAgent": "Mozilla/5.0...",
  "error": {
    "name": "ValidationError",
    "message": "Invalid email format",
    "stack": "..."
  }
}
```

---

## 📈 Indexes Created

For fast querying:
- `timestamp` (descending) - Recent logs first
- `level + timestamp` - Filter by error level
- `context + timestamp` - Filter by context (API, DATABASE, etc.)
- `requestId` - Track individual requests
- **TTL Index**: Auto-delete logs older than **90 days**

---

## 🔎 Query Logs via Admin API

### Get Recent Errors:
```bash
curl -H "Cookie: admin-session=YOUR_TOKEN" \
  "https://barter-dev.com/api/admin/logs?level=error&hours=24"
```

### Get Database Logs:
```bash
curl -H "Cookie: admin-session=YOUR_TOKEN" \
  "https://barter-dev.com/api/admin/logs?context=DATABASE&hours=24"
```

### Get Specific Request:
```bash
curl -H "Cookie: admin-session=YOUR_TOKEN" \
  "https://barter-dev.com/api/admin/logs?requestId=req_1234567890_abc123"
```

### Query Parameters:
- `level` - Filter by: `info`, `warn`, `error`, `debug`
- `context` - Filter by: `API`, `DATABASE`, `AUTH`, `EMAIL`
- `requestId` - Find all logs for a specific request
- `hours` - How far back to look (default: 24)
- `limit` - Max results (default: 100)

---

## 🛠️ Query Logs Directly in MongoDB

### Connect to MongoDB:
```bash
mongosh "$MONGODB_URI"
```

### Example Queries:

#### Get last 10 errors:
```javascript
db.logs.find({ level: "error" })
  .sort({ timestamp: -1 })
  .limit(10)
  .pretty()
```

#### Count errors by context:
```javascript
db.logs.aggregate([
  { $match: { level: "error" } },
  { $group: { _id: "$context", count: { $sum: 1 } } },
  { $sort: { count: -1 } }
])
```

#### Find validation failures:
```javascript
db.logs.find({ 
  message: /validation failed/i,
  timestamp: { $gte: new Date(Date.now() - 24*60*60*1000) }
}).pretty()
```

#### Track a specific request:
```javascript
db.logs.find({ 
  requestId: "req_1234567890_abc123" 
}).sort({ timestamp: 1 }).pretty()
```

#### Get error rate by hour:
```javascript
db.logs.aggregate([
  { $match: { 
    level: "error",
    timestamp: { $gte: new Date(Date.now() - 7*24*60*60*1000) }
  }},
  { $group: {
    _id: { $dateToString: { format: "%Y-%m-%d %H:00", date: "$timestamp" } },
    count: { $sum: 1 }
  }},
  { $sort: { _id: -1 } }
])
```

---

## 🎯 Benefits of MongoDB Logs

### vs CloudWatch:
1. **Cheaper** - No per-GB charges
2. **Easier queries** - Use MongoDB query language
3. **Longer retention** - Keep logs as long as you want
4. **Better analysis** - Aggregate and analyze easily
5. **Request tracking** - Follow user journey across logs

### Combined with CloudWatch:
- CloudWatch: Real-time monitoring & alerts
- MongoDB: Long-term analysis & debugging

---

## 📊 Example Use Cases

### 1. Debug User Issue
User reports: "Form won't submit"

**Step 1**: Find their submissions:
```javascript
db.logs.find({ 
  "data.email": "user@example.com",
  timestamp: { $gte: new Date("2026-01-21") }
}).sort({ timestamp: -1 })
```

**Step 2**: Get their request ID and trace full journey:
```javascript
db.logs.find({ requestId: "req_xxx" }).sort({ timestamp: 1 })
```

### 2. Monitor Form Field Issues
Which fields cause the most validation errors?

```javascript
db.logs.aggregate([
  { $match: { message: /validation failed/i } },
  { $unwind: "$data.fieldErrors" },
  { $group: { 
    _id: "$data.fieldErrors",
    count: { $sum: 1 }
  }},
  { $sort: { count: -1 } }
])
```

### 3. Track Database Performance
How often do DB queries fail?

```javascript
db.logs.find({
  context: "DATABASE",
  level: "error"
}).count()
```

---

## 🧹 Data Retention

**Automatic cleanup**: Logs older than 90 days are automatically deleted via TTL index.

**Manual cleanup** (if needed):
```javascript
// Delete logs older than 30 days
db.logs.deleteMany({
  timestamp: { $lt: new Date(Date.now() - 30*24*60*60*1000) }
})
```

**Change retention period**:
```javascript
// Change to 180 days
db.logs.dropIndex("timestamp_1")
db.logs.createIndex(
  { timestamp: 1 },
  { expireAfterSeconds: 180 * 24 * 60 * 60 }
)
```

---

## 🚀 What's Deployed

✅ MongoDB logging system  
✅ Automatic log collection  
✅ TTL index (90-day retention)  
✅ Query indexes for performance  
✅ Admin API endpoint (`/api/admin/logs`)  
✅ Integration with existing logger  

**Logs are being saved to MongoDB now!** 🎉

---

## 🔐 WorkMail Password Reset

**NEW PASSWORD**: `BarterDev2026!`

**Login here**: https://barter-dev.awsapps.com/mail  
**Email**: hello@barter-dev.com

✅ Try logging in now!

