'use client'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { formatCurrency } from '@/lib/stripe'

interface ClientWithStats {
  id: string
  name: string
  email: string
  address: string | null
  phone: string | null
  invoice_count: number
  total_billed: number
  total_paid: number
  created_at: string
}

function ClientModal({
  client,
  onClose,
  onSaved,
}: {
  client: ClientWithStats | null
  onClose: () => void
  onSaved: () => void
}) {
  const [name, setName] = useState(client?.name ?? '')
  const [email, setEmail] = useState(client?.email ?? '')
  const [address, setAddress] = useState(client?.address ?? '')
  const [phone, setPhone] = useState(client?.phone ?? '')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const method = client ? 'PATCH' : 'POST'
    const url = client ? `/api/clients/${client.id}` : '/api/clients'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, address, phone }),
    })

    const data = await res.json()
    if (!res.ok) { setError(data.error); setLoading(false); return }
    onSaved()
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h2 className="font-700 text-gray-900">{client ? 'Edit client' : 'Add client'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none">×</button>
        </div>
        <form onSubmit={handleSave} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-600 text-gray-700 mb-1.5">Name *</label>
            <input className="input" value={name} onChange={e => setName(e.target.value)} placeholder="Acme Corp" required />
          </div>
          <div>
            <label className="block text-sm font-600 text-gray-700 mb-1.5">Email *</label>
            <input className="input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="billing@acme.com" required />
          </div>
          <div>
            <label className="block text-sm font-600 text-gray-700 mb-1.5">Address</label>
            <input className="input" value={address} onChange={e => setAddress(e.target.value)} placeholder="123 Main St, City, Country" />
          </div>
          <div>
            <label className="block text-sm font-600 text-gray-700 mb-1.5">Phone</label>
            <input className="input" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+1 555 000 0000" />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">{error}</div>
          )}

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-secondary flex-1">Cancel</button>
            <button type="submit" disabled={loading} className="btn-primary flex-1">
              {loading ? 'Saving…' : client ? 'Save changes' : 'Add client'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function ClientsPage() {
  const [clients, setClients] = useState<ClientWithStats[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [modalClient, setModalClient] = useState<ClientWithStats | null | 'new'>( null)
  const [deleting, setDeleting] = useState<string | null>(null)

  const fetchClients = useCallback(async () => {
    const res = await fetch('/api/clients')
    const data = await res.json()
    setClients(data.data ?? [])
    setLoading(false)
  }, [])

  useEffect(() => { fetchClients() }, [fetchClients])

  async function handleDelete(client: ClientWithStats) {
    const msg = client.invoice_count > 0
      ? `Delete ${client.name}? They have ${client.invoice_count} invoice(s) — those invoices will remain but won't be linked to this client.`
      : `Delete ${client.name}? This cannot be undone.`
    if (!confirm(msg)) return
    setDeleting(client.id)
    await fetch(`/api/clients/${client.id}`, { method: 'DELETE' })
    setDeleting(null)
    fetchClients()
  }

  const filtered = clients.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-800 text-gray-900">Clients</h1>
          <p className="text-gray-500 mt-1">{clients.length} client{clients.length !== 1 ? 's' : ''} total</p>
        </div>
        <button onClick={() => setModalClient('new')} className="btn-primary">+ Add client</button>
      </div>

      {/* SEARCH */}
      {clients.length > 0 && (
        <div className="mb-6">
          <input
            className="input max-w-sm"
            placeholder="Search by name or email…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      )}

      {/* LIST */}
      {loading ? (
        <div className="card divide-y divide-gray-50">
          {[1, 2, 3].map(i => (
            <div key={i} className="px-6 py-5 flex items-center gap-4 animate-pulse">
              <div className="w-10 h-10 bg-gray-100 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-100 rounded w-32" />
                <div className="h-3 bg-gray-100 rounded w-48" />
              </div>
            </div>
          ))}
        </div>
      ) : clients.length === 0 ? (
        <div className="card text-center py-16">
          <div className="text-5xl mb-4">👥</div>
          <h3 className="font-700 text-gray-900 mb-2">No clients yet</h3>
          <p className="text-gray-500 text-sm mb-6">Add your first client to speed up invoice creation.</p>
          <button onClick={() => setModalClient('new')} className="btn-primary">Add your first client</button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-gray-500">No clients match "{search}"</p>
          <button onClick={() => setSearch('')} className="text-coral-500 text-sm mt-2 hover:underline">Clear search</button>
        </div>
      ) : (
        <div className="card overflow-hidden">
          <div className="divide-y divide-gray-50">
            {filtered.map(client => (
              <div key={client.id} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors group">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-10 h-10 bg-coral-100 rounded-full flex items-center justify-center font-700 text-coral-600 flex-shrink-0">
                    {client.name[0].toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="font-600 text-gray-900 truncate">{client.name}</p>
                    <p className="text-sm text-gray-400 truncate">{client.email}</p>
                    {client.phone && <p className="text-xs text-gray-400">{client.phone}</p>}
                  </div>
                </div>

                <div className="flex items-center gap-8 flex-shrink-0 ml-4">
                  {/* Stats */}
                  <div className="hidden md:flex gap-6 text-right">
                    <div>
                      <p className="text-sm font-700 text-gray-900">{client.invoice_count}</p>
                      <p className="text-xs text-gray-400">invoice{client.invoice_count !== 1 ? 's' : ''}</p>
                    </div>
                    <div>
                      <p className="text-sm font-700 text-teal-600">{formatCurrency(client.total_paid)}</p>
                      <p className="text-xs text-gray-400">paid</p>
                    </div>
                    {client.total_billed > client.total_paid && (
                      <div>
                        <p className="text-sm font-700 text-amber-600">{formatCurrency(client.total_billed - client.total_paid)}</p>
                        <p className="text-xs text-gray-400">outstanding</p>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link
                      href={`/invoices/new?client_id=${client.id}&client_name=${encodeURIComponent(client.name)}&client_email=${encodeURIComponent(client.email)}&client_address=${encodeURIComponent(client.address ?? '')}&client_phone=${encodeURIComponent(client.phone ?? '')}`}
                      className="text-xs font-600 text-coral-500 hover:text-coral-600 px-3 py-1.5 rounded-lg hover:bg-coral-50 transition-colors">
                      + Invoice
                    </Link>
                    <button
                      onClick={() => setModalClient(client)}
                      className="text-xs font-600 text-gray-500 hover:text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(client)}
                      disabled={deleting === client.id}
                      className="text-xs font-600 text-red-400 hover:text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors">
                      {deleting === client.id ? '…' : 'Delete'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL */}
      {modalClient !== null && (
        <ClientModal
          client={modalClient === 'new' ? null : modalClient}
          onClose={() => setModalClient(null)}
          onSaved={() => { setModalClient(null); fetchClients() }}
        />
      )}
    </div>
  )
}
