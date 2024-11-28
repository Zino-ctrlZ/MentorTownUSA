'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { ChevronDown, ChevronUp, MoreHorizontal, Search, UserPlus, Filter, RefreshCw, Download, Eye, EyeOff, CheckCircle, AlertCircle, ArrowUpCircle } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock data for clients (replace with Supabase integration later)
const mockClients = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', phone: '123-456-7890', currentGoal: 'Career Transition', progress: 'On Track' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', phone: '234-567-8901', currentGoal: 'Skill Development', progress: 'Behind' },
  { id: 3, name: 'Carol Williams', email: 'carol@example.com', phone: '345-678-9012', currentGoal: 'Leadership Training', progress: 'Ahead' },
  { id: 4, name: 'David Brown', email: 'david@example.com', phone: '456-789-0123', currentGoal: 'Work-Life Balance', progress: 'On Track' },
  { id: 5, name: 'Eva Davis', email: 'eva@example.com', phone: '567-890-1234', currentGoal: 'Career Advancement', progress: 'On Track' },
]

export default function ClientManagementPage() {
  const [clients, setClients] = useState(mockClients)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortColumn, setSortColumn] = useState('name')
  const [sortDirection, setSortDirection] = useState('asc')
  const [selectedClients, setSelectedClients] = useState<number[]>([])
  const [visibleContacts, setVisibleContacts] = useState<number[]>([])
  const router = useRouter()

  useEffect(() => {
    // TODO: Integrate with Supabase to fetch real client data
  }, [])

  const handleSort = (column: string) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  const sortedClients = [...clients].sort((a, b) => {
    if (a[sortColumn as keyof typeof a] < b[sortColumn as keyof typeof b]) {
      return sortDirection === 'asc' ? -1 : 1
    }
    if (a[sortColumn as keyof typeof a] > b[sortColumn as keyof typeof b]) {
      return sortDirection === 'asc' ? 1 : -1
    }
    return 0
  })

  const filteredClients = sortedClients.filter(client =>
    Object.values(client).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  const handleSelectClient = (clientId: number) => {
    setSelectedClients(prev =>
      prev.includes(clientId)
        ? prev.filter(id => id !== clientId)
        : [...prev, clientId]
    )
  }

  const handleSelectAllClients = () => {
    setSelectedClients(
      selectedClients.length === filteredClients.length
        ? []
        : filteredClients.map(client => client.id)
    )
  }

  const handleBulkAction = (action: string) => {
    // TODO: Implement bulk actions (e.g., send reminders, update status)
    console.log(`Bulk action: ${action} for clients:`, selectedClients)
  }

  const toggleContactVisibility = (clientId: number) => {
    setVisibleContacts(prev =>
      prev.includes(clientId)
        ? prev.filter(id => id !== clientId)
        : [...prev, clientId]
    )
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Client Management</CardTitle>
          <CardDescription>Manage and track your clients' progress</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Search clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
              <Button variant="outline">
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Button onClick={() => router.push('/add-client')}>
                <UserPlus className="mr-2 h-4 w-4" />
                Add Client
              </Button>
              <Button variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </Button>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <Checkbox
                    checked={selectedClients.length === filteredClients.length}
                    onCheckedChange={handleSelectAllClients}
                  />
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort('name')}>
                  Name {sortColumn === 'name' && (sortDirection === 'asc' ? <ChevronUp className="inline" /> : <ChevronDown className="inline" />)}
                </TableHead>
                <TableHead>Contact</TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort('currentGoal')}>
                  Current Goal {sortColumn === 'currentGoal' && (sortDirection === 'asc' ? <ChevronUp className="inline" /> : <ChevronDown className="inline" />)}
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort('progress')}>
                  Progress {sortColumn === 'progress' && (sortDirection === 'asc' ? <ChevronUp className="inline" /> : <ChevronDown className="inline" />)}
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedClients.includes(client.id)}
                      onCheckedChange={() => handleSelectClient(client.id)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={`/avatars/${client.id}.png`} alt={client.name} />
                        <AvatarFallback>{client.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <span>{client.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {visibleContacts.includes(client.id) ? (
                      <div>
                        {client.email}<br />
                        {client.phone}
                      </div>
                    ) : (
                      <Button variant="ghost" size="sm" onClick={() => toggleContactVisibility(client.id)}>
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">Show contact info</span>
                      </Button>
                    )}
                  </TableCell>
                  <TableCell>{client.currentGoal}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {client.progress === 'On Track' && <CheckCircle className="h-5 w-5 text-green-500" />}
                      {client.progress === 'Behind' && <AlertCircle className="h-5 w-5 text-red-500" />}
                      {client.progress === 'Ahead' && <ArrowUpCircle className="h-5 w-5 text-blue-500" />}
                      <span>{client.progress}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => router.push(`/client/${client.id}`)}>View Profile</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push(`/schedule/${client.id}`)}>Schedule Appointment</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push(`/notes/${client.id}`)}>Session Notes</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Delete Client</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {selectedClients.length > 0 && (
            <div className="mt-4 flex items-center space-x-2">
              <Select onValueChange={handleBulkAction}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Bulk Actions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="reminder">Send Reminder</SelectItem>
                  <SelectItem value="update">Update Status</SelectItem>
                  <SelectItem value="export">Export Data</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={() => handleBulkAction('apply')}>Apply to Selected</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

