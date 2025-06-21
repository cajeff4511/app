import React, { useState } from 'react';
import api from './api';

export default function NewPost({ onUpdate }) {
  const [content, setContent] = useState('');
  const [file, setFile]       = useState(null);
  const [preview, setPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleFile = e => {
    const f = e.target.files[0];
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const submit = async e => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    const form = new FormData();
    form.append('content', content);
    if (file) form.append('image', file);

    try {
      const res = await api.post('/api/posts', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      onUpdate(res.data);
      setContent('');
      setFile(null);
      setPreview(null);
    } catch {
      alert('Post failed');
    }
    setSubmitting(false);
  };

  return (
    <form onSubmit={submit} className="bg-[#655F43] text-white p-6 rounded-lg shadow space-y-4">
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="What's on your mind?"
        className="w-full px-4 py-2 border border-[#FFD300] rounded-md bg-[#202020] text-white focus:ring-2 focus:ring-[#FFD300]"
        rows={3}
      />
      {preview && (
        <img src={preview} alt="preview" className="w-full max-h-60 object-cover rounded-md" />
      )}
      <div className="flex items-center space-x-4">
        <label className="cursor-pointer text-sm border border-[#FFD300] rounded-sm px-4 py-2 text-[#FFD300] hover:underline">
          Create Image
          <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
        </label>
        <button
          type="submit"
          disabled={submitting}
          className="cursor-pointer ml-auto bg-[#FFD300] text-[#202020] px-4 py-2 rounded-md transition hover:bg-[#e6c000]"
        >
          {submitting ? 'Posting…' : 'Post'}
        </button>
      </div>
    </form>
  );
}
