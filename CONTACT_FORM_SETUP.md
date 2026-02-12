# Contact form – receive messages at kiransai2312@gmail.com

The contact form sends emails via **Resend**. Do this once:

---

## 1. Create a Resend account

1. Go to **https://resend.com**
2. Click **Sign Up**
3. Sign up with **kiransai2312@gmail.com** (or any email – you’ll receive form messages at kiransai2312@gmail.com)

---

## 2. Get your API key

1. After logging in, open **API Keys**:  
   https://resend.com/api-keys  
   (or: **Resend dashboard → API Keys**)
2. Click **Create API Key**
3. Give it a name (e.g. `Portfolio`) and click **Create**
4. **Copy the key** (it starts with `re_`). You won’t see it again.

---

## 3. Add the key to your project

1. In your project folder (where `package.json` is), create a file named **`.env.local`**  
   (no name before the dot, extension is `.env.local`).

2. Put this in the file (paste your real key instead of `re_paste_here`):

   ```
   RESEND_API_KEY=re_paste_here
   ```

3. Save the file.

4. **Restart the dev server**: stop `npm run dev` (Ctrl+C) and run `npm run dev` again.

---

## 4. Test

Submit a message from the contact form on your site. It should show “Message sent” and you should get an email at **kiransai2312@gmail.com**.

---

**Note:** Resend’s free tier lets you send to your own email (the one you use for Resend). If you use kiransai2312@gmail.com for Resend, you’re all set. If you use a different email for Resend, you can still receive at kiransai2312@gmail.com once the key is set.
