'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { PlusCircle, Paperclip, Send } from 'lucide-react'

// Mock client data
const mockClientData = {
  id: 1,
  name: 'Alice Johnson',
  email: 'alice@example.com',
  phone: '123-456-7890',
  careerGoal: 'Transition to Product Management',
  interests: ['Technology', 'User Experience', 'Agile Methodologies'],
  currentJob: 'Software Developer at TechCorp',
  progress: 'On Track',
  sessions: [
    { date: '2023-05-01', topic: 'Career Transition Strategy', notes: 'Discussed steps for transitioning to Product Management role.' },
    { date: '2023-05-15', topic: 'Resume Review', notes: 'Reviewed and updated resume to highlight relevant PM skills.' },
    { date: '2023-06-01', topic: 'Interview Preparation', notes: 'Practiced common PM interview questions and scenarios.' },
  ],
  assessments: [
    { date: '2023-04-15', type: 'Skills Assessment', score: 75 },
    { date: '2023-05-20', type: 'Leadership Potential', score: 82 },
    { date: '2023-06-10', type: 'Product Sense', score: 88 },
  ],
  goals: [
    { title: 'Complete PM Certification', status: 'In Progress', dueDate: '2023-08-31' },
    { title: 'Develop Product Roadmap', status: 'Not Started', dueDate: '2023-09-30' },
    { title: 'Network with 5 PMs', status: 'Completed', dueDate: '2023-07-15' },
  ],
}

export default function ClientDetailPage({ params }: { params: { id: string } }) {
  const [client, setClient] = useState(mockClientData)
  const [newNote, setNewNote] = useState('')
  const router = useRouter()

  useEffect(() => {
    // In a real application, fetch client data based on params.id
    // For now, we're just using the mock data
  }, [params.id])

  const handleAddNote = () => {
    if (newNote.trim()) {
      const updatedSessions = [...client.sessions, {
        date: new Date().toISOString().split('T')[0],
        topic: 'New Session',
        notes: newNote.trim()
      }]
      setClient({ ...client, sessions: updatedSessions })
      setNewNote('')
    }
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={`/avatars/${client.id}.png`} alt={client.name} />
              <AvatarFallback>{client.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-3xl">{client.name}</CardTitle>
              <CardDescription>{client.careerGoal}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="sessions">Sessions</TabsTrigger>
              <TabsTrigger value="goals">Goals</TabsTrigger>
              <TabsTrigger value="assessments">Assessments</TabsTrigger>
              <TabsTrigger value="communication">Communication</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Email: {client.email}</p>
                    <p>Phone: {client.phone}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Current Job</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{client.currentJob}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Interests</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-4">
                      {client.interests.map((interest, index) => (
                        <li key={index}>{interest}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{client.progress}</p>
                  </CardContent>
                </Card>
              </div>
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>Development Over Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={[
                          { date: '2023-04-15', skills: 75, leadership: 70, productSense: 65 },
                          { date: '2023-05-20', skills: 78, leadership: 82, productSense: 75 },
                          { date: '2023-06-10', skills: 82, leadership: 85, productSense: 88 },
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="skills" stroke="#8884d8" />
                        <Line type="monotone" dataKey="leadership" stroke="#82ca9d" />
                        <Line type="monotone" dataKey="productSense" stroke="#ffc658" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="sessions">
              <Card>
                <CardHeader>
                  <CardTitle>Session History</CardTitle>
                </CardHeader>
                <CardContent>
                  {client.sessions.map((session, index) => (
                    <div key={index} className="mb-4 p-4 border rounded">
                      <h3 className="font-bold">{session.date} - {session.topic}</h3>
                      <p>{session.notes}</p>
                    </div>
                  ))}
                  <div className="mt-4">
                    <Label htmlFor="newNote">Add New Session Note</Label>
                    <Textarea
                      id="newNote"
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      placeholder="Enter session notes here..."
                      className="mt-2"
                    />
                    <Button onClick={handleAddNote} className="mt-2">Add Note</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="goals">
              <Card>
                <CardHeader>
                  <CardTitle>Goals and Milestones</CardTitle>
                </CardHeader>
                <CardContent>
                  {client.goals.map((goal, index) => (
                    <div key={index} className="mb-4 p-4 border rounded">
                      <h3 className="font-bold">{goal.title}</h3>
                      <p>Status: {goal.status}</p>
                      <p>Due Date: {goal.dueDate}</p>
                    </div>
                  ))}
                  <Button className="mt-2">Add New Goal</Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="assessments">
              <Card>
                <CardHeader>
                  <CardTitle>Assessment Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={client.assessments}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="score" stroke="#8884d8" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4">
                    <Button>Add New Assessment</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="communication">
              <Card>
                <CardHeader>
                  <CardTitle>Communication</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div>
                      <Label htmlFor="message">Send Message</Label>
                      <Textarea id="message" placeholder="Type your message here..." className="mt-2" />
                      <Button className="mt-2">
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </Button>
                    </div>
                    <div>
                      <Label>Attachments</Label>
                      <div className="mt-2 space-y-2">
                        <div className="flex items-center">
                          <Paperclip className="mr-2 h-4 w-4" />
                          <span>resume.pdf</span>
                        </div>
                        <div className="flex items-center">
                          <Paperclip className="mr-2 h-4 w-4" />
                          <span>portfolio.pdf</span>
                        </div>
                      </div>
                      <Button variant="outline" className="mt-2">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Upload New File
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

