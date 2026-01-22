# Custom Domain Setup - tradewithshaffy.com → Vercel

## Step-by-Step Guide to Connect Your Domain

---

## Part 1: Add Domain to Vercel

### 1. Go to Your Vercel Project
- Visit: https://vercel.com/zakarehman
- Click on your "trade-with-shafy" project

### 2. Go to Domains Settings
- Click "Settings" tab
- Click "Domains" in the left sidebar

### 3. Add Your Domain
- In the "Add Domain" field, type: `tradewithshaffy.com`
- Click "Add"
- Vercel will show you DNS records to configure

### 4. Add WWW Subdomain (Optional but Recommended)
- Add: `www.tradewithshaffy.com`
- Click "Add"

---

## Part 2: Configure DNS in hPanel

You'll see DNS records from Vercel. Here's what you need to add in your hPanel:

### Option A: Using A Record (Recommended for Root Domain)

**For Root Domain (tradewithshaffy.com):**

1. Login to hPanel at: https://hpanel.hostinger.com
2. Go to "Domains" → Click on `tradewithshaffy.com`
3. Click "DNS / Name Servers"
4. Click "Edit" on DNS Zone

**Add these A Records:**

| Type | Name | Points to | TTL |
|------|------|-----------|-----|
| A | @ | 76.76.21.21 | 14400 |
| A | @ | 76.76.21.22 | 14400 |

**For WWW Subdomain:**

| Type | Name | Points to | TTL |
|------|------|-----------|-----|
| CNAME | www | cname.vercel-dns.com | 14400 |

### Option B: Using CNAME (Alternative)

If Vercel gives you different instructions, use CNAME:

| Type | Name | Points to | TTL |
|------|------|-----------|-----|
| CNAME | @ | cname.vercel-dns.com | 14400 |
| CNAME | www | cname.vercel-dns.com | 14400 |

**Note:** Some DNS providers don't allow CNAME for root domain (@). In that case, use Option A.

---

## Part 3: Step-by-Step DNS Configuration in hPanel

### 1. Login to Hostinger
- Go to: https://hpanel.hostinger.com
- Enter your login credentials

### 2. Navigate to DNS Settings
- Click "Domains" in the left menu
- Find `tradewithshaffy.com` and click on it
- Click "DNS / Name Servers" or "Manage DNS"

### 3. Find or Create A Records

**Delete any existing A records pointing to old IP addresses**

**Add New A Records:**

**Record 1:**
- Type: `A`
- Name: `@` (or leave blank for root domain)
- Points to: `76.76.21.21`
- TTL: `14400` (or select "Automatic")

**Record 2:**
- Type: `A`
- Name: `@`
- Points to: `76.76.21.22`
- TTL: `14400`

### 4. Add CNAME for WWW

**Record:**
- Type: `CNAME`
- Name: `www`
- Points to: `cname.vercel-dns.com`
- TTL: `14400`

### 5. Save Changes
- Click "Save" or "Add Record"
- Wait for confirmation

---

## Part 4: Verify in Vercel

### 1. Go Back to Vercel
- Return to your Vercel project → Settings → Domains

### 2. Check Status
- You'll see your domain with a status indicator
- Initially: "Invalid Configuration" or "Pending"
- After DNS propagates: "Valid Configuration" ✅

### 3. Wait for Verification
- DNS propagation can take 5 minutes to 48 hours
- Usually takes 15-30 minutes for most providers
- Vercel checks automatically every few minutes

### 4. Force Check (Optional)
- Click "Refresh" button next to domain
- Or wait for automatic verification

---

## Part 5: Enable HTTPS/SSL

**Good News:** Vercel automatically provisions SSL certificate once domain is verified!

### Auto-SSL Features:
- ✅ Free SSL certificate (Let's Encrypt)
- ✅ Auto-renewal
- ✅ HTTPS redirect enabled by default
- ✅ HTTP/2 and HTTP/3 support

---

## Troubleshooting

### Issue 1: Domain Shows "Invalid Configuration"

**Check:**
1. Verify DNS records are correct (no typos)
2. Make sure you're editing the right domain
3. Clear any conflicting DNS records
4. Wait longer (up to 24-48 hours)

**Common Mistakes:**
- ❌ Adding `http://` or `www` in the A record name
- ❌ Wrong IP addresses
- ❌ Conflicting CNAME records
- ❌ Editing wrong DNS zone

### Issue 2: DNS Not Propagating

**Check DNS propagation:**
- Visit: https://dnschecker.org/
- Enter: `tradewithshaffy.com`
- See if A record shows Vercel IPs globally

**Force DNS refresh:**
- Clear your browser cache
- Use incognito/private mode
- Try different device
- Flush DNS: `ipconfig /flushdns` (Windows)

### Issue 3: SSL Certificate Error

**Solution:**
- Wait 10-15 minutes after domain verification
- Vercel auto-provisions SSL
- Check "Domains" tab for SSL status
- Try accessing via `https://tradewithshaffy.com`

### Issue 4: Domain Points to Old Site

**Solution:**
1. Remove all A records pointing to Hostinger
2. Add only Vercel A records
3. Wait for DNS propagation
4. Clear browser cache

---

## Visual Guide: hPanel DNS Configuration

### Step 1: Find Your Domain
```
Domains → tradewithshaffy.com → DNS / Name Servers
```

### Step 2: Current Records (Before Changes)
You might see something like:
```
A    @    IP.ADDRESS.FROM.HOSTINGER    14400
```

### Step 3: After Adding Vercel Records
Should look like:
```
A      @      76.76.21.21               14400
A      @      76.76.21.22               14400
CNAME  www    cname.vercel-dns.com      14400
```

### Step 4: Remove Conflicting Records
Delete:
- ❌ Old A records pointing to Hostinger IPs
- ❌ Any conflicting CNAME records for @
- ❌ Old hosting provider records

---

## Expected Timeline

| Time | Status |
|------|--------|
| 0 min | Added domain in Vercel |
| 0-5 min | Configure DNS in hPanel |
| 5-15 min | DNS starts propagating |
| 15-30 min | Domain verified in Vercel ✅ |
| 30-60 min | SSL certificate issued ✅ |
| 1-24 hours | Full global DNS propagation |

---

## Verification Checklist

After completing setup, verify:

- [ ] DNS records added in hPanel
- [ ] Domain shows "Valid" in Vercel
- [ ] Site loads at `http://tradewithshaffy.com`
- [ ] Site loads at `http://www.tradewithshaffy.com`
- [ ] Site loads at `https://tradewithshaffy.com` (with SSL)
- [ ] Site loads at `https://www.tradewithshaffy.com`
- [ ] HTTP automatically redirects to HTTPS
- [ ] All animations working
- [ ] YouTube video loads
- [ ] Mobile menu works

---

## Quick Test Commands

### Check DNS Records (Windows/Mac/Linux):
```bash
# Check A record
nslookup tradewithshaffy.com

# Check CNAME
nslookup www.tradewithshaffy.com

# Alternative
dig tradewithshaffy.com
dig www.tradewithshaffy.com
```

### Expected Output:
```
Name:    tradewithshaffy.com
Address: 76.76.21.21
Address: 76.76.21.22
```

---

## After Domain is Connected

### What You Get:
- ✅ `tradewithshaffy.com` → Your Vercel site
- ✅ `www.tradewithshaffy.com` → Your Vercel site
- ✅ Auto HTTPS redirect
- ✅ Free SSL certificate
- ✅ Global CDN (fast worldwide)
- ✅ Auto-deploy on git push

### Set Primary Domain (Optional):
1. Go to Vercel → Settings → Domains
2. Find `tradewithshaffy.com`
3. Click "..." menu → "Set as Primary"
4. All other domains will redirect to this one

---

## Alternative: Nameserver Method (Advanced)

If DNS records don't work, you can point nameservers to Vercel:

### 1. Get Vercel Nameservers
- Contact Vercel support or check documentation
- Usually looks like: `ns1.vercel-dns.com`

### 2. Change in hPanel
- Go to: Domains → tradewithshaffy.com
- Click "Change Nameservers"
- Enter Vercel nameservers
- Save

**Warning:** This method gives Vercel full DNS control.

---

## Contact Support

### Vercel Support:
- Email: support@vercel.com
- Docs: https://vercel.com/docs/custom-domains

### Hostinger Support:
- Live Chat: Available in hPanel
- Email: Check hPanel for support options

---

## Summary

**What You Need to Do:**

1. **Add domain in Vercel** → Get DNS records
2. **Login to hPanel** → DNS settings
3. **Add A records** → Point to Vercel IPs
4. **Add CNAME** → For www subdomain
5. **Wait 15-30 min** → DNS propagation
6. **Verify** → Domain works with HTTPS

**That's it!** Your custom domain will be live and pointing to your Vercel-hosted portfolio.

---

## Need Help?

If you encounter issues:
1. Take screenshots of DNS settings
2. Check DNS propagation at dnschecker.org
3. Verify Vercel domain status
4. Contact Vercel or Hostinger support with screenshots

Your site will be accessible at:
- **https://tradewithshaffy.com** ✅
- **https://www.tradewithshaffy.com** ✅

---

**Ready to set it up?** Follow the steps above and your domain will be live in 30 minutes! 🚀
