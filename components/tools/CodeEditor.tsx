'use client';

import { useState, useEffect, useRef } from 'react';
import { BaseTool } from './BaseTool';
import { 
  Code, 
  Eye, 
  EyeOff, 
  Copy, 
  Check, 
  Download,
  Upload,
  Trash2,
  Maximize2,
  Minimize2,
  RefreshCw,
  Play,
  Save,
  FileCode,
  FileText,
  FileJson,
  Terminal,
  ChevronDown,
  CheckCircle2
} from 'lucide-react';

interface CodeEditorProps {
  title: string;
  description: string;
  article: string;
  dict: any;
}

type Language = {
  id: string;
  name: string;
  extension: string;
  icon: any;
  color: string;
  sample: string;
};

const languages: Language[] = [
  {
    id: 'html',
    name: 'HTML',
    extension: 'html',
    icon: FileCode,
    color: '#e34c26',
    sample: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HmzTools</title>
</head>
<body>
  <div class="container">
    <h1>Hello, World! 🚀</h1>
    <p>Ini adalah HTML</p>
  </div>
</body>
</html>`
  },
  {
    id: 'css',
    name: 'CSS',
    extension: 'css',
    icon: FileText,
    color: '#264de4',
    sample: `.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  color: white;
  box-shadow: 0 8px 32px rgba(0,0,0,0.2);
}

h1 {
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 10px;
}

p {
  text-align: center;
  font-size: 1.1rem;
  opacity: 0.9;
}`
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    extension: 'js',
    icon: FileJson,
    color: '#f7df1e',
    sample: `// JavaScript Sample
function greet(name) {
  return \`Hello, \${name}! 🚀\`;
}

const users = [
  { id: 1, name: 'Alice', age: 25 },
  { id: 2, name: 'Bob', age: 30 },
  { id: 3, name: 'Charlie', age: 35 }
];

// Filter users older than 28
const olderUsers = users.filter(user => user.age > 28);
console.log(olderUsers);

// Arrow function with destructuring
const getNames = (users) => users.map(({ name }) => name);
console.log(getNames(users));

// Async example
const fetchData = async () => {
  const response = await fetch('https://api.example.com/data');
  const data = await response.json();
  return data;
};

// Export module
export default { greet, users, fetchData };`
  },
  {
    id: 'python',
    name: 'Python',
    extension: 'py',
    icon: Terminal,
    color: '#3776ab',
    sample: `# Python Sample
def greet(name):
    return f"Hello, {name}! 🚀"

class User:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def get_info(self):
        return f"{self.name} is {self.age} years old"

# List comprehension
users = [
    {"name": "Alice", "age": 25},
    {"name": "Bob", "age": 30},
    {"name": "Charlie", "age": 35}
]

# Filter and map
older_users = [user for user in users if user["age"] > 28]
names = [user["name"] for user in users]

# Decorator example
def timer(func):
    import time
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"Time taken: {end - start:.4f}s")
        return result
    return wrapper

@timer
def slow_function():
    import time
    time.sleep(0.5)
    return "Done!"

# Main
if __name__ == "__main__":
    print(greet("World"))
    user = User("John", 28)
    print(user.get_info())
    print(f"Names: {names}")
    print(slow_function())`
  },
  {
    id: 'java',
    name: 'Java',
    extension: 'java',
    icon: Terminal,
    color: '#007396',
    sample: `// Java Sample
import java.util.*;
import java.util.stream.*;

public class Main {
    public static String greet(String name) {
        return "Hello, " + name + "! 🚀";
    }

    public static void main(String[] args) {
        // List of users
        List<Map<String, Object>> users = new ArrayList<>();
        users.add(Map.of("name", "Alice", "age", 25));
        users.add(Map.of("name", "Bob", "age", 30));
        users.add(Map.of("name", "Charlie", "age", 35));

        // Filter users older than 28
        List<Map<String, Object>> olderUsers = users.stream()
            .filter(u -> (int) u.get("age") > 28)
            .collect(Collectors.toList());

        // Get names
        List<String> names = users.stream()
            .map(u -> (String) u.get("name"))
            .collect(Collectors.toList());

        System.out.println(greet("World"));
        System.out.println("Older users: " + olderUsers);
        System.out.println("Names: " + names);

        // Lambda example
        Runnable runnable = () -> {
            System.out.println("Running in lambda!");
        };
        runnable.run();
    }
}`
  },
  {
    id: 'cpp',
    name: 'C++',
    extension: 'cpp',
    icon: Terminal,
    color: '#00599c',
    sample: `// C++ Sample
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>

using namespace std;

string greet(const string& name) {
    return "Hello, " + name + "! 🚀";
}

// User struct
struct User {
    string name;
    int age;
    
    string getInfo() const {
        return name + " is " + to_string(age) + " years old";
    }
};

int main() {
    // Vector of users
    vector<User> users = {
        {"Alice", 25},
        {"Bob", 30},
        {"Charlie", 35}
    };

    // Filter users older than 28
    vector<User> olderUsers;
    copy_if(users.begin(), users.end(), back_inserter(olderUsers), 
        [](const User& u) { return u.age > 28; });

    // Get names
    vector<string> names;
    transform(users.begin(), users.end(), back_inserter(names),
        [](const User& u) { return u.name; });

    cout << greet("World") << endl;
    cout << "Older users count: " << olderUsers.size() << endl;
    
    for (const auto& user : users) {
        cout << user.getInfo() << endl;
    }

    // Lambda example
    auto lambda = []() {
        cout << "Running in lambda!" << endl;
    };
    lambda();

    return 0;
}`
  },
  {
    id: 'php',
    name: 'PHP',
    extension: 'php',
    icon: Terminal,
    color: '#777bb3',
    sample: `<?php
// PHP Sample

function greet($name) {
    return "Hello, $name! 🚀";
}

// User class
class User {
    public $name;
    public $age;
    
    public function __construct($name, $age) {
        $this->name = $name;
        $this->age = $age;
    }
    
    public function getInfo() {
        return "{$this->name} is {$this->age} years old";
    }
}

// Array of users
$users = [
    ["name" => "Alice", "age" => 25],
    ["name" => "Bob", "age" => 30],
    ["name" => "Charlie", "age" => 35]
];

// Filter users older than 28
$olderUsers = array_filter($users, function($user) {
    return $user["age"] > 28;
});

// Get names
$names = array_column($users, "name");

echo greet("World") . "\n";
echo "Older users: " . print_r($olderUsers, true) . "\n";
echo "Names: " . implode(", ", $names) . "\n";

// Object example
$user = new User("John", 28);
echo $user->getInfo() . "\n";

// Arrow function (PHP 7.4+)
$multiply = fn($x, $y) => $x * $y;
echo "5 * 3 = " . $multiply(5, 3) . "\n";
?>
`
  },
  {
    id: 'go',
    name: 'Go',
    extension: 'go',
    icon: Terminal,
    color: '#00add8',
    sample: `// Go Sample
package main

import (
    "fmt"
    "strings"
)

// Greet function
func greet(name string) string {
    return fmt.Sprintf("Hello, %s! 🚀", name)
}

// User struct
type User struct {
    Name string
    Age  int
}

func (u User) GetInfo() string {
    return fmt.Sprintf("%s is %d years old", u.Name, u.Age)
}

func main() {
    // Slice of users
    users := []User{
        {"Alice", 25},
        {"Bob", 30},
        {"Charlie", 35},
    }

    // Filter users older than 28
    var olderUsers []User
    for _, user := range users {
        if user.Age > 28 {
            olderUsers = append(olderUsers, user)
        }
    }

    // Get names
    var names []string
    for _, user := range users {
        names = append(names, user.Name)
    }

    fmt.Println(greet("World"))
    fmt.Printf("Older users count: %d\n", len(olderUsers))
    fmt.Printf("Names: %s\n", strings.Join(names, ", "))

    // Go routine example
    ch := make(chan string)
    go func() {
        ch <- "Hello from goroutine!"
    }()
    fmt.Println(<-ch)

    // Defer example
    defer fmt.Println("Deferred message")
    fmt.Println("Main message")
}`
  },
  {
    id: 'rust',
    name: 'Rust',
    extension: 'rs',
    icon: Terminal,
    color: '#dea584',
    sample: `// Rust Sample
use std::collections::HashMap;

// Greet function
fn greet(name: &str) -> String {
    format!("Hello, {}! 🚀", name)
}

// User struct
#[derive(Debug, Clone)]
struct User {
    name: String,
    age: u32,
}

impl User {
    fn get_info(&self) -> String {
        format!("{} is {} years old", self.name, self.age)
    }
}

fn main() {
    // Vector of users
    let mut users = vec![
        User { name: String::from("Alice"), age: 25 },
        User { name: String::from("Bob"), age: 30 },
        User { name: String::from("Charlie"), age: 35 },
    ];

    // Filter users older than 28
    let older_users: Vec<User> = users
        .iter()
        .filter(|u| u.age > 28)
        .cloned()
        .collect();

    // Get names
    let names: Vec<String> = users
        .iter()
        .map(|u| u.name.clone())
        .collect();

    println!("{}", greet("World"));
    println!("Older users count: {}", older_users.len());
    println!("Names: {:?}", names);

    // HashMap example
    let mut scores = HashMap::new();
    scores.insert(String::from("Alice"), 100);
    scores.insert(String::from("Bob"), 85);

    for (name, score) in &scores {
        println!("{}: {}", name, score);
    }

    // Closure example
    let multiply = |x: i32, y: i32| x * y;
    println!("5 * 3 = {}", multiply(5, 3));

    // Match example
    let number = 7;
    match number {
        1 => println!("One"),
        2 => println!("Two"),
        3..=10 => println!("Three to ten"),
        _ => println!("Other"),
    }
}`
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    extension: 'ts',
    icon: FileCode,
    color: '#3178c6',
    sample: `// TypeScript Sample
interface User {
  id: number;
  name: string;
  age: number;
  email?: string;
}

type UserWithoutId = Omit<User, 'id'>;

class UserService {
  private users: User[] = [];

  addUser(user: UserWithoutId): User {
    const newUser: User = {
      id: this.users.length + 1,
      ...user
    };
    this.users.push(newUser);
    return newUser;
  }

  getUsers(): User[] {
    return this.users;
  }

  getUsersOlderThan(age: number): User[] {
    return this.users.filter(user => user.age > age);
  }

  getNames(): string[] {
    return this.users.map(user => user.name);
  }
}

// Generic function
function wrapInArray<T>(value: T): T[] {
  return [value];
}

// Async/await
async function fetchData(): Promise<{ data: any }> {
  const response = await fetch('https://api.example.com/data');
  const data = await response.json();
  return data;
}

// Usage
const service = new UserService();
service.addUser({ name: 'Alice', age: 25 });
service.addUser({ name: 'Bob', age: 30 });
service.addUser({ name: 'Charlie', age: 35 });

console.log('All users:', service.getUsers());
console.log('Users older than 28:', service.getUsersOlderThan(28));
console.log('Names:', service.getNames());
console.log('Wrap in array:', wrapInArray('Hello'));

// Type guard
function isString(value: any): value is string {
  return typeof value === 'string';
}

const testValue: unknown = 'Hello';
if (isString(testValue)) {
  console.log(testValue.toUpperCase());
}`
  }
];

export function CodeEditor({ title, description, article, dict }: CodeEditorProps) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0]);
  const [code, setCode] = useState(languages[0].sample);
  const [output, setOutput] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [lineNumbers, setLineNumbers] = useState(true);
  const [wordWrap, setWordWrap] = useState(true);
  const [fontSize, setFontSize] = useState(14);
  const [error, setError] = useState('');

  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Update code when language changes
  useEffect(() => {
    setCode(currentLanguage.sample);
    setOutput('');
    setError('');
  }, [currentLanguage]);

  // Run code (only for HTML/CSS/JS)
  const runCode = () => {
    if (currentLanguage.id === 'html' || currentLanguage.id === 'css' || currentLanguage.id === 'javascript') {
      try {
        const iframe = iframeRef.current;
        if (iframe) {
          const doc = iframe.contentDocument || iframe.contentWindow?.document;
          if (doc) {
            let content = '';
            if (currentLanguage.id === 'html') {
              content = code;
            } else if (currentLanguage.id === 'css') {
              content = `
<!DOCTYPE html>
<html>
<head>
  <style>${code}</style>
</head>
<body>
  <div style="padding: 20px; font-family: sans-serif;">
    <h1>CSS Preview</h1>
    <p>Ini adalah preview untuk CSS</p>
    <button style="padding: 10px 20px; border: none; border-radius: 8px; cursor: pointer;">Button</button>
  </div>
</body>
</html>`;
            } else {
              content = `
<!DOCTYPE html>
<html>
<head>
  <title>JavaScript Preview</title>
</head>
<body>
  <div style="padding: 20px; font-family: sans-serif;">
    <h1>JavaScript Preview</h1>
    <div id="output" style="padding: 20px; background: #f0f0f0; border-radius: 8px; margin-top: 10px;"></div>
    <button onclick="runJS()" style="padding: 10px 20px; background: #667eea; color: white; border: none; border-radius: 8px; cursor: pointer; margin-top: 10px;">Run JavaScript</button>
  </div>
  <script>
    function runJS() {
      try {
        const result = (function() {
          ${code}
        })();
        document.getElementById('output').innerHTML = '<strong>Result:</strong><br>' + JSON.stringify(result, null, 2);
      } catch(e) {
        document.getElementById('output').innerHTML = '<strong>Error:</strong><br>' + e.message;
      }
    }
    // Auto run
    try {
      const result = (function() {
        ${code}
      })();
      if (document.getElementById('output')) {
        document.getElementById('output').innerHTML = '<strong>Result:</strong><br>' + JSON.stringify(result, null, 2);
      }
    } catch(e) {
      // Silent fail for auto run
    }
  <\/script>
</body>
</html>`;
            }
            doc.open();
            doc.write(content);
            doc.close();
            setError('');
          }
        }
      } catch (e) {
        setError('Error: ' + (e as Error).message);
      }
    } else {
      // For other languages, just show the code
      setOutput(code);
      setError('Preview hanya tersedia untuk HTML, CSS, dan JavaScript');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadCode = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `code.${currentLanguage.extension}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const uploadCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setCode(content);
        setOutput('');
        setError('');
      };
      reader.readAsText(file);
    }
  };

  const clearAll = () => {
    setCode('');
    setOutput('');
    setError('');
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const getLineCount = () => {
    return code.split('\n').length;
  };

  const getCharacterCount = () => {
    return code.length;
  };

  return (
    <BaseTool title={title} description={description} article={article}>
      <div className={`space-y-4 ${isFullscreen ? 'fixed inset-0 z-50 bg-gray-50 dark:bg-gray-950 p-4 overflow-auto' : ''}`}>
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Language Selector */}
          <div className="relative">
            <select
              value={currentLanguage.id}
              onChange={(e) => {
                const lang = languages.find(l => l.id === e.target.value);
                if (lang) setCurrentLanguage(lang);
              }}
              className="appearance-none px-4 py-2 pr-10 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-gray-900 dark:text-white cursor-pointer"
            >
              {languages.map((lang) => (
                <option key={lang.id} value={lang.id}>
                  {lang.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          {/* Language badge */}
          <span 
            className="px-3 py-1 rounded-full text-xs font-medium text-white"
            style={{ backgroundColor: currentLanguage.color }}
          >
            {currentLanguage.name} (.{currentLanguage.extension})
          </span>

          {/* Actions */}
          {(currentLanguage.id === 'html' || currentLanguage.id === 'css' || currentLanguage.id === 'javascript') && (
            <button onClick={runCode} className="btn-primary">
              <Play className="w-4 h-4 inline mr-2" />
              Run
            </button>
          )}

          <button
            onClick={() => setShowPreview(!showPreview)}
            className="btn-secondary"
          >
            {showPreview ? (
              <EyeOff className="w-4 h-4 inline mr-2" />
            ) : (
              <Eye className="w-4 h-4 inline mr-2" />
            )}
            Preview
          </button>

          <button onClick={toggleFullscreen} className="btn-secondary">
            {isFullscreen ? (
              <Minimize2 className="w-4 h-4 inline mr-2" />
            ) : (
              <Maximize2 className="w-4 h-4 inline mr-2" />
            )}
          </button>

          <button onClick={copyToClipboard} className="btn-secondary">
            {copied ? (
              <Check className="w-4 h-4 inline mr-2" />
            ) : (
              <Copy className="w-4 h-4 inline mr-2" />
            )}
            Copy
          </button>

          <button onClick={downloadCode} className="btn-secondary">
            <Download className="w-4 h-4 inline mr-2" />
            Download
          </button>

          <label className="btn-secondary cursor-pointer">
            <Upload className="w-4 h-4 inline mr-2" />
            Upload
            <input
              type="file"
              accept=".html,.htm,.css,.js,.ts,.py,.java,.cpp,.php,.go,.rs,.txt"
              onChange={uploadCode}
              className="hidden"
            />
          </label>

          <button onClick={clearAll} className="btn-secondary">
            <Trash2 className="w-4 h-4 inline mr-2" />
            Clear
          </button>

          {/* Settings */}
          <button
            onClick={() => setLineNumbers(!lineNumbers)}
            className={`px-2 py-1 rounded text-xs transition-all ${
              lineNumbers 
                ? 'bg-indigo-500 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Lines
          </button>

          <button
            onClick={() => setWordWrap(!wordWrap)}
            className={`px-2 py-1 rounded text-xs transition-all ${
              wordWrap 
                ? 'bg-indigo-500 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Wrap
          </button>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setFontSize(Math.max(10, fontSize - 2))}
              className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs"
            >
              A-
            </button>
            <span className="text-xs text-gray-400">{fontSize}px</span>
            <button
              onClick={() => setFontSize(Math.min(24, fontSize + 2))}
              className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs"
            >
              A+
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className={`p-3 rounded-xl flex items-center gap-2 ${
            error.includes('Preview')
              ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
              : 'bg-red-500/10 text-red-500 border border-red-500/20'
          }`}>
            <span>{error.includes('Preview') ? '⚠️' : '❌'}</span>
            {error}
          </div>
        )}

        {/* Editor & Preview */}
        <div className={`grid ${showPreview ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'} gap-4`}>
          {/* Editor */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>
                {currentLanguage.name} • {getLineCount()} lines • {getCharacterCount()} chars
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                Ready
              </span>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className={`w-full min-h-[500px] p-4 bg-gray-900 dark:bg-gray-950 text-gray-100 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 font-mono resize-y ${
                wordWrap ? 'whitespace-pre-wrap' : 'whitespace-pre'
              }`}
              style={{ fontSize: `${fontSize}px` }}
              spellCheck={false}
            />
          </div>

          {/* Preview */}
          {showPreview && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {currentLanguage.id === 'html' || currentLanguage.id === 'css' || currentLanguage.id === 'javascript' 
                    ? 'Live Preview' 
                    : 'Output Preview'}
                </span>
                {(currentLanguage.id === 'html' || currentLanguage.id === 'css' || currentLanguage.id === 'javascript') && (
                  <span className="text-xs text-green-400">🟢 Interactive</span>
                )}
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700" style={{ height: '500px' }}>
                {(currentLanguage.id === 'html' || currentLanguage.id === 'css' || currentLanguage.id === 'javascript') ? (
                  <iframe
                    ref={iframeRef}
                    className="w-full h-full"
                    title="Live Preview"
                    sandbox="allow-scripts allow-modals allow-same-origin"
                  />
                ) : (
                  <div className="p-4 h-full overflow-auto font-mono text-sm text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-800">
                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span>Kode siap untuk di-download atau di-copy</span>
                    </div>
                    <pre className="whitespace-pre-wrap break-all">
                      {code.substring(0, 500)}
                      {code.length > 500 && <span className="text-gray-400">... (truncated)</span>}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Status Bar */}
        <div className="flex items-center justify-between text-xs text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-2">
          <div className="flex gap-4">
            <span>Language: {currentLanguage.name}</span>
            <span>Lines: {getLineCount()}</span>
            <span>Chars: {getCharacterCount()}</span>
            <span>Extension: .{currentLanguage.extension}</span>
          </div>
          <div className="flex gap-4">
            <span>{lineNumbers ? 'Line numbers: ON' : 'Line numbers: OFF'}</span>
            <span>{wordWrap ? 'Word wrap: ON' : 'Word wrap: OFF'}</span>
            <span>Font size: {fontSize}px</span>
          </div>
        </div>
      </div>
    </BaseTool>
  );
}