'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Sector, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts'
import { DownloadIcon, BellIcon, CalendarIcon, Users, BarChartIcon, BookOpen, Bell, Settings, GraduationCap, Menu } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ChartContainer } from "@/components/ui/chart"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

// Custom 3D-style icon components
const Icon3D = ({ children }: { children: React.ReactNode }) => (
  <div className="relative w-12 h-12 bg-gray-100 rounded-lg shadow-lg flex items-center justify-center transform hover:scale-110 transition-transform duration-200">
    {React.cloneElement(children as React.ReactElement, { className: 'h-6 w-6 text-black' })}
  </div>
)

const HamburgerMenu = () => {
  const router = useRouter()
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="fixed left-4 top-4 z-50">
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px]">
        <nav className="flex flex-col space-y-4 mt-8">
          <Button variant="ghost" className="justify-start" onClick={() => router.push('/client-management')}>
            <Users className="mr-2 h-4 w-4" />
            Client Management
          </Button>
          <Button variant="ghost" className="justify-start" onClick={() => console.log('Calendar')}>
            <CalendarIcon className="mr-2 h-4 w-4" />
            Calendar
          </Button>
          <Button variant="ghost" className="justify-start" onClick={() => console.log('Resource Library')}>
            <BookOpen className="mr-2 h-4 w-4" />
            Resource Library
          </Button>
          <Button variant="ghost" className="justify-start" onClick={() => console.log('Course Creation')}>
            <GraduationCap className="mr-2 h-4 w-4" />
            Course Creation
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
  )
}

const clientProgressData = [
  { month: 'Jan', completedGoals: 4, ongoingProjects: 6 },
  { month: 'Feb', completedGoals: 3, ongoingProjects: 7 },
  { month: 'Mar', completedGoals: 5, ongoingProjects: 5 },
  { month: 'Apr', completedGoals: 6, ongoingProjects: 4 },
  { month: 'May', completedGoals: 4, ongoingProjects: 6 },
  { month: 'Jun', completedGoals: 7, ongoingProjects: 3 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded shadow-lg border border-gray-200">
        <p className="font-semibold">{label}</p>
        <p className="text-[#8884d8]">
          Completed Goals: {payload[0].value}
        </p>
        <p className="text-[#82ca9d]">
          Ongoing Projects: {payload[1].value}
        </p>
      </div>
    );
  }
  return null;
};

// Simulated data - replace with Supabase integration later
const assessmentData = {
  hardSkills: [
    { name: 'Technical Writing', score: 85 },
    { name: 'Data Analysis', score: 72 },
    { name: 'Project Management', score: 90 },
    { name: 'Public Speaking', score: 78 },
    { name: 'Problem Solving', score: 88 },
  ],
  softSkills: [
    { name: 'Communication', score: 92 },
    { name: 'Teamwork', score: 88 },
    { name: 'Adaptability', score: 85 },
    { name: 'Leadership', score: 80 },
    { name: 'Time Management', score: 75 },
  ],
  progressOverTime: [
    { month: 'Jan', score: 70 },
    { month: 'Feb', score: 72 },
    { month: 'Mar', score: 75 },
    { month: 'Apr', score: 78 },
    { month: 'May', score: 82 },
    { month: 'Jun', score: 85 },
  ],
  assessmentTypes: [
    { name: 'Skills Assessment', value: 40 },
    { name: 'Personality Test', value: 30 },
    { name: 'Career Aptitude', value: 20 },
    { name: 'Leadership Potential', value: 10 },
  ],
}

// Mentor data
const mentorData = {
  courseSuccessRate: [
    { name: "Course A", rate: 85 },
    { name: "Course B", rate: 92 },
    { name: "Course C", rate: 78 },
    { name: "Course D", rate: 88 },
  ],
  menteeProgress: [
    { name: "Alice", progress: 75 },
    { name: "Bob", progress: 60 },
    { name: "Charlie", progress: 90 },
    { name: "David", progress: 85 },
  ],
  upcomingMentoringSessions: [
    { name: "Emma", date: "2023-06-20", time: "10:00 AM", topic: "Career Planning" },
    { name: "Frank", date: "2023-06-21", time: "2:00 PM", topic: "Resume Review" },
    { name: "Grace", date: "2023-06-22", time: "11:00 AM", topic: "Interview Preparation" },
  ]
}

export default function Dashboard() {
  const router = useRouter()
  const [progressValue, setProgressValue] = useState(66)
  const [activeIndex, setActiveIndex] = useState(0)
  const [activeMetrics, setActiveMetrics] = useState(['hardSkills', 'softSkills', 'progressOverTime'])
  const [filterPeriod, setFilterPeriod] = useState('6months')
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Significant improvement in Technical Writing skills' },
    { id: 2, message: 'New assessment results available for review' },
  ])

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

  const assessmentDataOld = {
    'Physical Activity': [
      { name: "Cardio", value: 30, details: "30 minutes of daily cardio" },
      { name: "Strength", value: 25, details: "Weight training 3 times a week" },
      { name: "Flexibility", value: 20, details: "Daily stretching routine" },
      { name: "Sports", value: 15, details: "Participation in team sports" },
      { name: "Rest", value: 10, details: "Adequate rest and recovery" },
    ],
    'Soft Skills': [
      { name: "Communication", value: 35, details: "Effective verbal and written communication" },
      { name: "Teamwork", value: 25, details: "Collaborative spirit and ability to work in diverse groups" },
      { name: "Problem Solving", value: 20, details: "Analytical thinking and creative solution finding" },
      { name: "Adaptability", value: 15, details: "Flexibility in changing environments" },
      { name: "Leadership", value: 5, details: "Guiding and motivating others" },
    ],
    'Injury Report': [
      { name: "No Injury", value: 60, details: "Clients reporting no injuries" },
      { name: "Minor Strain", value: 20, details: "Minor muscle strains or soreness" },
      { name: "Joint Pain", value: 10, details: "Mild joint pain or discomfort" },
      { name: "Sprain", value: 7, details: "Ligament sprains requiring rest" },
      { name: "Severe Injury", value: 3, details: "Injuries requiring medical attention" },
    ],
  }

  const clientCounts = {
    'Physical Activity': 45,
    'Soft Skills': 38,
    'Injury Report': 52,
  }

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index)
  }

  const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`Value ${value}`}</text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
          {`(Rate ${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    )
  }

  const pieChartData = [
    { name: "Leadership", value: 30 },
    { name: "Communication", value: 25 },
    { name: "Problem Solving", value: 20 },
    { name: "Teamwork", value: 15 },
    { name: "Adaptability", value: 10 },
  ]

  const lineChartData = [
    { date: "Jan", progress: 45 },
    { date: "Feb", progress: 52 },
    { date: "Mar", progress: 49 },
    { date: "Apr", progress: 58 },
    { date: "May", progress: 66 },
  ]

  const barChartData = [
    { metric: "Client Satisfaction", value: 92 },
    { metric: "Session Attendance", value: 88 },
    { metric: "Goal Completion", value: 78 },
    { metric: "Resource Utilization", value: 85 },
  ]

  // Simulated function to fetch data from Supabase
  const fetchAssessmentData = async () => {
    // In a real application, this would be a call to Supabase
    // For now, we'll just use the simulated data
    console.log('Fetching assessment data...')
  }

  useEffect(() => {
    fetchAssessmentData()
  }, [])

  const handleExport = () => {
    // Simulated export function
    console.log('Exporting assessment data...')
    // In a real application, this would generate and download a report
  }

  const handleFilterChange = (value: string) => {
    setFilterPeriod(value)
    // In a real application, this would trigger a re-fetch of data based on the new filter
    fetchAssessmentData()
  }

  const toggleMetric = (metric: string) => {
    setActiveMetrics(prev =>
      prev.includes(metric)
        ? prev.filter(m => m !== metric)
        : [...prev, metric]
    )
  }

  return (
    <div className="p-8 bg-gray-50">
      <HamburgerMenu />
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Welcome back, Sarah!</h1>
        <div className="flex space-x-4">
          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics & Reports</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="mentor">Mentor</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card className="cursor-pointer" onClick={() => router.push('/client-management')}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
                <Icon3D>
                  <Users />
                </Icon3D>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">+2 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Sessions</CardTitle>
                <Icon3D>
                  <CalendarIcon />
                </Icon3D>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">3 more than last week</p>
              </CardContent>
            </Card>
            <Card className="cursor-pointer" onClick={() => router.push('/client-management')}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Client Progress</CardTitle>
                <Icon3D>
                  <BarChartIcon />
                </Icon3D>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{progressValue}%</div>
                <Progress value={progressValue} className="mt-2" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Resources Used</CardTitle>
                <Icon3D>
                  <BookOpen />
                </Icon3D>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">35</div>
                <p className="text-xs text-muted-foreground">+5 from last month</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 mb-8">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Client Progress Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={clientProgressData}>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Line type="monotone" dataKey="completedGoals" stroke="#8884d8" strokeWidth={2} />
                      <Line type="monotone" dataKey="ongoingProjects" stroke="#82ca9d" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Upcoming Sessions</CardTitle>
                <CardDescription>You have 3 sessions scheduled for today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { id: 1, name: "Alice Johnson", time: "10:00 AM", type: "Career Guidance" },
                    { id: 2, name: "Bob Smith", time: "2:00 PM", type: "Resume Review" },
                    { id: 3, name: "Carol Williams", time: "4:30 PM", type: "Interview Prep" },
                  ].map((session, index) => (
                    <div key={index} className="flex items-center">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={`/avatars/${session.id}.png`} alt={session.name} />
                        <AvatarFallback>{session.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="ml-4 space-y-1">
                        <Link href={`/client/${session.id}`} className="text-sm font-medium leading-none hover:underline">
                          {session.name}
                        </Link>
                        <p className="text-sm text-muted-foreground">
                          {session.time} - {session.type}
                        </p>
                      </div>
                      <Badge className="ml-auto" variant="outline">{session.type}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 mb-8">
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Client Interactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {[
                    { id: 1, name: 'David Brown', interaction: 'Goal achieved', date: '2 hours ago' },
                    { id: 2, name: 'Emma Davis', interaction: 'Session feedback', date: 'Yesterday' },
                    { id: 3, name: 'Frank Wilson', interaction: 'New milestone set', date: '2 days ago' },
                  ].map((client, index) => (
                    <div key={index} className="flex items-center">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={`/avatars/${client.id}.png`} alt={client.name} />
                        <AvatarFallback>{client.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="ml-4 space-y-1">
                        <Link href={`/client/${client.id}`} className="text-sm font-medium leading-none hover:underline">
                          {client.name}
                        </Link>
                        <p className="text-sm text-muted-foreground">
                          {client.interaction}
                        </p>
                      </div>
                      <div className="ml-auto font-medium text-sm text-muted-foreground">
                        {client.date}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Assessment Results</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="Physical Activity">
                  <div className="flex justify-between items-center mb-4">
                    <TabsList>
                      {Object.keys(assessmentDataOld).map((tab) => (
                        <TabsTrigger key={tab} value={tab}>{tab}</TabsTrigger>
                      ))}
                    </TabsList>
                  </div>
                  {Object.entries(assessmentDataOld).map(([tabName, data]) => (
                    <TabsContent key={tabName} value={tabName}>
                      <div className="flex justify-end mb-2">
                        <span className="text-sm font-medium text-muted-foreground">
                          {clientCounts[tabName]} clients assessed
                        </span>
                      </div>
                      <div className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              activeIndex={activeIndex}
                              activeShape={renderActiveShape}
                              data={data}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                              onMouseEnter={(_, index) => setActiveIndex(index)}
                            >
                              {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip
                              content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                  const data = payload[0].payload;
                                  return (
                                    <div className="bg-white p-4 rounded shadow">
                                      <p className="font-bold">{data.name}</p>
                                      <p>Value: {data.value}</p>
                                      <p>{data.details}</p>
                                    </div>
                                  );
                                }
                                return null;
                              }}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Recent Course Enrollments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Advanced Coaching Techniques", progress: 30 },
                    { name: "Digital Marketing for Coaches", progress: 60 },
                    { name: "Client Relationship Management", progress: 15 },
                  ].map((course, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <p className="text-sm font-medium">{course.name}</p>
                        <p className="text-sm text-muted-foreground">{course.progress}%</p>
                      </div>
                      <Progress value={course.progress} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barChartData}>
                      <XAxis dataKey="metric" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="hsl(var(--chart-1))" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Customizable Widgets</CardTitle>
              <CardDescription>Drag and drop to rearrange your dashboard</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="active" className="w-full">
                <TabsList>
                  <TabsTrigger value="active">Active Widgets</TabsTrigger>
                  <TabsTrigger value="available">Available Widgets</TabsTrigger>
                </TabsList>
                <TabsContent value="active">
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    {["Client Progress", "Upcoming Sessions", "Recent Interactions", "Resource Usage", "Performance Metrics", "Course Enrollments"].map((widget, index) => (
                      <div key={index} className="bg-secondary p-4 rounded-lg cursor-move">
                        {widget}
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="available">
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    {["Community Engagement", "Financial Overview", "Task Manager", "Goal Tracker", "Mentor Network", "Learning Path"].map((widget, index) => (
                      <div key={index} className="bg-muted p-4 rounded-lg cursor-pointer">
                        {widget}
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold">Assessment Dashboard</h2>
            <div className="flex space-x-4">
              <Select onValueChange={handleFilterChange} defaultValue={filterPeriod}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select time period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1month">Last Month</SelectItem>
                  <SelectItem value="3months">Last 3 Months</SelectItem>
                  <SelectItem value="6months">Last 6 Months</SelectItem>
                  <SelectItem value="1year">Last Year</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleExport}>
                <DownloadIcon className="mr-2 h-4 w-4" />
                Export Report
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Skills Overview</CardTitle>
                <CardDescription>Comparison of hard and soft skills</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[...assessmentData.hardSkills, ...assessmentData.softSkills]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="score" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Assessment Types</CardTitle>
                <CardDescription>Distribution of assessment types</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={assessmentData.assessmentTypes}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {assessmentData.assessmentTypes.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Progress Over Time</CardTitle>
              <CardDescription>Average skill improvement trend</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={assessmentData.progressOverTime}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="score" stroke="#8884d8" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Customizable Widgets</CardTitle>
                <CardDescription>Select metrics to display</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {['hardSkills', 'softSkills', 'progressOverTime', 'assessmentTypes'].map((metric) => (
                    <Button
                      key={metric}
                      variant={activeMetrics.includes(metric) ? "default" : "outline"}
                      onClick={() => toggleMetric(metric)}
                    >
                      {metric}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Recent updates and alerts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <Alert key={notification.id}>
                      <BellIcon className="h-4 w-4" />
                      <AlertTitle>New Update</AlertTitle>
                      <AlertDescription>
                        {notification.message}
                      </AlertDescription>
                    </Alert>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="calendar">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Upcoming Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Alice Johnson", time: "10:00 AM", type: "Career Guidance", date: "2023-06-15" },
                    { name: "Bob Smith", time: "2:00 PM", type: "Resume Review", date: "2023-06-16" },
                    { name: "Carol Williams", time: "4:30 PM", type: "Interview Prep", date: "2023-06-17" },
                  ].map((session, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarFallback>{session.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{session.name}</p>
                          <p className="

