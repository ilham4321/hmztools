'use client';

import { useState, useEffect } from 'react';
import { BaseTool } from './BaseTool';
import { 
  Code, 
  Copy, 
  Check, 
  Plus,
  Search,
  Trash2,
  Edit,
  Save,
  X,
  FolderOpen,
  Tag,
  Clock
} from 'lucide-react';

interface CodeSnippetManagerProps {
  title: string;
  description: string;
  article: string;
  dict: any;
}

interface Snippet {
  id: string;
  title: string;
  code: string;
  language: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

const languages = [
  'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C#',
  'PHP', 'Ruby', 'Go', 'Rust', 'HTML', 'CSS', 'SQL', 'Bash', 'JSON', 'YAML'
];

export function CodeSnippetManager({ title, description, article, dict }: CodeSnippetManagerProps) {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingSnippet, setEditingSnippet] = useState<Snippet | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    code: '',
    language: 'JavaScript',
    tags: '',
  });
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Load snippets from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('hmztools_snippets');
    if (saved) {
      setSnippets(JSON.parse(saved));
    } else {
      // Add example snippets
      const examples: Snippet[] = [
        {
          id: '1',
          title: 'Hello World - JavaScript',
          code: 'console.log("Hello, World!");',
          language: 'JavaScript',
          tags: ['example', 'basic'],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '2',
          title: 'React Component',
          code: `function App() {\n  return <div>Hello React</div>;\n}`,
          language: 'JavaScript',
          tags: ['react', 'component'],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ];
      setSnippets(examples);
      localStorage.setItem('hmztools_snippets', JSON.stringify(examples));
    }
  }, []);

  const saveSnippets = (newSnippets: Snippet[]) => {
    setSnippets(newSnippets);
    localStorage.setItem('hmztools_snippets', JSON.stringify(newSnippets));
  };

  const addSnippet = () => {
    if (!formData.title || !formData.code) return;

    const newSnippet: Snippet = {
      id: Date.now().toString(),
      title: formData.title,
      code: formData.code,
      language: formData.language,
      tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    saveSnippets([newSnippet, ...snippets]);
    setFormData({ title: '', code: '', language: 'JavaScript', tags: '' });
    setShowAddModal(false);
  };

  const updateSnippet = () => {
    if (!editingSnippet || !formData.title || !formData.code) return;

    const updated: Snippet = {
      ...editingSnippet,
      title: formData.title,
      code: formData.code,
      language: formData.language,
      tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
      updatedAt: new Date().toISOString(),
    };

    const newSnippets = snippets.map(s => s.id === updated.id ? updated : s);
    saveSnippets(newSnippets);
    setEditingSnippet(null);
    setFormData({ title: '', code: '', language: 'JavaScript', tags: '' });
    setShowAddModal(false);
  };

  const deleteSnippet = (id: string) => {
    if (confirm('Yakin ingin menghapus snippet ini?')) {
      saveSnippets(snippets.filter(s => s.id !== id));
    }
  };

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const openEditModal = (snippet: Snippet) => {
    setEditingSnippet(snippet);
    setFormData({
      title: snippet.title,
      code: snippet.code,
      language: snippet.language,
      tags: snippet.tags.join(', '),
    });
    setShowAddModal(true);
  };

  const filteredSnippets = snippets.filter(s => {
    const matchSearch = s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        s.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        s.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchLanguage = !selectedLanguage || s.language === selectedLanguage;
    return matchSearch && matchLanguage;
  });

  const getLanguageColor = (lang: string) => {
    const colors: Record<string, string> = {
      'JavaScript': 'bg-yellow-500/20 text-yellow-400',
      'TypeScript': 'bg-blue-500/20 text-blue-400',
      'Python': 'bg-green-500/20 text-green-400',
      'Java': 'bg-red-500/20 text-red-400',
      'C++': 'bg-purple-500/20 text-purple-400',
      'HTML': 'bg-orange-500/20 text-orange-400',
      'CSS': 'bg-pink-500/20 text-pink-400',
      'SQL': 'bg-cyan-500/20 text-cyan-400',
      'Go': 'bg-teal-500/20 text-teal-400',
      'Rust': 'bg-amber-500/20 text-amber-400',
      'PHP': 'bg-indigo-500/20 text-indigo-400',
      'Ruby': 'bg-rose-500/20 text-rose-400',
      'Bash': 'bg-lime-500/20 text-lime-400',
      'JSON': 'bg-emerald-500/20 text-emerald-400',
      'YAML': 'bg-sky-500/20 text-sky-400',
      'C#': 'bg-violet-500/20 text-violet-400',
    };
    return colors[lang] || 'bg-gray-500/20 text-gray-400';
  };

  return (
    <BaseTool title={title} description={description} article={article}>
      <div className="space-y-6">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => {
              setEditingSnippet(null);
              setFormData({ title: '', code: '', language: 'JavaScript', tags: '' });
              setShowAddModal(true);
            }}
            className="btn-primary"
          >
            <Plus className="w-4 h-4 inline mr-2" />
            Tambah Snippet
          </button>
          <div className="relative flex-1 min-w-[150px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari snippet..."
              className="w-full px-4 py-2 pl-10 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-gray-900 dark:text-white"
          >
            <option value="">Semua Bahasa</option>
            {languages.map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>

        {/* Snippets List */}
        {filteredSnippets.length === 0 ? (
          <div className="text-center py-12">
            <Code className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">
              {searchTerm ? 'Tidak ada snippet yang ditemukan' : 'Belum ada snippet. Tambahkan snippet pertama!'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredSnippets.map((snippet) => (
              <div key={snippet.id} className="p-4 glass rounded-xl hover:shadow-glow transition-shadow">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h4 className="font-medium text-gray-900 dark:text-white truncate">
                        {snippet.title}
                      </h4>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getLanguageColor(snippet.language)}`}>
                        {snippet.language}
                      </span>
                      {snippet.tags.map((tag, i) => (
                        <span key={i} className="px-2 py-0.5 bg-gray-200 dark:bg-gray-700 rounded-full text-xs text-gray-600 dark:text-gray-300">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <pre className="mt-2 p-3 bg-gray-900 dark:bg-gray-950 rounded-lg text-gray-100 text-sm font-mono overflow-x-auto max-h-[100px]">
                      {snippet.code}
                    </pre>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(snippet.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-1 flex-shrink-0">
                    <button
                      onClick={() => copyToClipboard(snippet.code, snippet.id)}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      {copiedId === snippet.id ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={() => openEditModal(snippet)}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteSnippet(snippet.id)}
                      className="p-2 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal Add/Edit */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="relative max-w-2xl w-full glass rounded-2xl p-6 border-2 border-indigo-500/30 shadow-2xl animate-slide-up">
              <button
                onClick={() => setShowAddModal(false)}
                className="absolute top-3 right-3 p-1 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                {editingSnippet ? 'Edit Snippet' : 'Tambah Snippet'}
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">
                    Judul
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Nama snippet..."
                    className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">
                    Kode
                  </label>
                  <textarea
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    placeholder="Tulis kode di sini..."
                    rows={6}
                    className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent text-gray-900 dark:text-white font-mono text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">
                      Bahasa
                    </label>
                    <select
                      value={formData.language}
                      onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                      className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-gray-900 dark:text-white"
                    >
                      {languages.map(lang => (
                        <option key={lang} value={lang}>{lang}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">
                      Tags (pisahkan dengan koma)
                    </label>
                    <input
                      type="text"
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                      placeholder="react, hooks, contoh"
                      className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <button
                  onClick={editingSnippet ? updateSnippet : addSnippet}
                  disabled={!formData.title || !formData.code}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="w-4 h-4 inline mr-2" />
                  {editingSnippet ? 'Update Snippet' : 'Simpan Snippet'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </BaseTool>
  );
}