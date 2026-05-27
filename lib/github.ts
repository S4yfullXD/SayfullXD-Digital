// lib/github.ts
// Utility untuk commit file ke GitHub via REST API

const GITHUB_API = 'https://api.github.com'
const OWNER = process.env.GITHUB_OWNER ?? ''
const REPO = process.env.GITHUB_REPO ?? ''
const TOKEN = process.env.GITHUB_TOKEN ?? ''

const headers = () => ({
  Authorization: `Bearer ${TOKEN}`,
  'Content-Type': 'application/json',
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
})

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

// Cek apakah file sudah ada (untuk deteksi duplikat)
export async function fileExists(filePath: string): Promise<boolean> {
  const url = `${GITHUB_API}/repos/${OWNER}/${REPO}/contents/${filePath}`
  const res = await fetch(url, { headers: headers() })
  return res.status === 200
}

// Get SHA dari file yang sudah ada (diperlukan saat update)
export async function getFileSHA(filePath: string): Promise<string | null> {
  const url = `${GITHUB_API}/repos/${OWNER}/${REPO}/contents/${filePath}`
  const res = await fetch(url, { headers: headers() })
  if (res.status !== 200) return null
  const data = await res.json()
  return data.sha ?? null
}

// Upload satu file ke GitHub
export async function uploadFile(
  filePath: string,
  content: string | Buffer,
  commitMessage: string
): Promise<boolean> {
  const url = `${GITHUB_API}/repos/${OWNER}/${REPO}/contents/${filePath}`

  // Convert content ke base64
  const b64 =
    typeof content === 'string'
      ? Buffer.from(content, 'utf8').toString('base64')
      : content.toString('base64')

  // Cek SHA jika file sudah ada
  const sha = await getFileSHA(filePath)

  const body: Record<string, unknown> = {
    message: commitMessage,
    content: b64,
    ...(sha ? { sha } : {}),
  }

  const res = await fetch(url, {
    method: 'PUT',
    headers: headers(),
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(`GitHub upload failed for ${filePath}: ${JSON.stringify(err)}`)
  }

  await delay(500) // rate limit courtesy
  return true
}

// Commit beberapa file sekaligus (satu per satu dengan delay)
export async function commitFiles(
  files: Record<string, string | Buffer>,
  commitMessage: string
): Promise<void> {
  for (const [filePath, content] of Object.entries(files)) {
    await uploadFile(filePath, content, commitMessage)
    await delay(500)
  }
}

// Hapus file dari GitHub
export async function deleteFile(
  filePath: string,
  commitMessage: string
): Promise<boolean> {
  const sha = await getFileSHA(filePath)
  if (!sha) return false

  const url = `${GITHUB_API}/repos/${OWNER}/${REPO}/contents/${filePath}`
  const res = await fetch(url, {
    method: 'DELETE',
    headers: headers(),
    body: JSON.stringify({ message: commitMessage, sha }),
  })

  return res.ok
}
