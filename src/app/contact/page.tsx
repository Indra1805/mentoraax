// app/contact/page.tsx
'use client';
import { useState } from 'react';

export default function ContactPage() {
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [message,setMessage] = useState('');
  const [status,setStatus] = useState<'idle'|'sending'|'success'|'error'>('idle');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      });
      if (res.ok) {
        setStatus('success');
        setName(''); setEmail(''); setMessage('');
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  }

  return (
    <div className="max-w-xl">
      <h2 className="text-3xl font-semibold mb-4">Contact Us</h2>
      <form onSubmit={submit} className="space-y-4">
        <input required value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" className="w-full border rounded px-3 py-2" />
        <input required value={email} onChange={e=>setEmail(e.target.value)} placeholder="Your email" type="email" className="w-full border rounded px-3 py-2" />
        <textarea required value={message} onChange={e=>setMessage(e.target.value)} placeholder="Message" rows={6} className="w-full border rounded px-3 py-2" />
        <div>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded" disabled={status==='sending'}>
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </button>
        </div>
        {status === 'success' && <p className="text-green-600">Thanks! We’ll get back to you soon.</p>}
        {status === 'error' && <p className="text-red-600">Something went wrong. Try again later.</p>}
      </form>
    </div>
  );
}
