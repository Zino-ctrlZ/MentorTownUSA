import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen, Calendar, Users, BarChart } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center pl-4">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">MentorTown</span>
          </Link>
          <nav className="ml-auto flex gap-4">
            <Link href="/dashboard" className="text-sm font-medium hover:underline underline-offset-4">
              Dashboard
            </Link>
            <Link href="/courses" className="text-sm font-medium hover:underline underline-offset-4">
              Courses
            </Link>
            <Link href="/resources" className="text-sm font-medium hover:underline underline-offset-4">
              Resources
            </Link>
            <Link href="/community" className="text-sm font-medium hover:underline underline-offset-4">
              Community
            </Link>
            <Link href="/support" className="text-sm font-medium hover:underline underline-offset-4">
              Support
            </Link>
          </nav>
          <div className="ml-4 flex items-center space-x-4">
            <Button variant="outline" asChild>
              <Link href="/login">Log In</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Empower Your Coaching Journey with MentorTown
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Unlock your potential as a counselor or career coach with our comprehensive platform for professional growth and client success.
                </p>
              </div>
              <div className="space-x-4">
                <Button size="lg" asChild>
                  <Link href="/register">Get Started</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/learn-more">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader>
                  <BookOpen className="w-10 h-10 mb-2 text-primary" />
                  <CardTitle>Resource Library</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Access a vast collection of tools, templates, and guides to enhance your coaching practice.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Calendar className="w-10 h-10 mb-2 text-primary" />
                  <CardTitle>Client Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Streamline scheduling, reminders, and client data management for a seamless coaching experience.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Users className="w-10 h-10 mb-2 text-primary" />
                  <CardTitle>Community Network</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Connect with fellow professionals, share insights, and grow your network within our supportive community.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <BarChart className="w-10 h-10 mb-2 text-primary" />
                  <CardTitle>Data Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Gain valuable insights with our advanced analytics tools to track progress and improve outcomes.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              What Our Users Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sarah T.</CardTitle>
                  <CardDescription>Career Coach</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>"MentorTown has revolutionized my coaching practice. The tools and resources available have helped me provide more value to my clients than ever before."</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Michael R.</CardTitle>
                  <CardDescription>University Counselor</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>"The community aspect of MentorTown is incredible. I've learned so much from other professionals and feel supported in my career growth."</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Emily L.</CardTitle>
                  <CardDescription>Executive Coach</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>"The client management features have saved me hours of administrative work, allowing me to focus on what I do best - coaching my clients to success."</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl mb-6">Featured Resources</h2>
                <ul className="space-y-4">
                  <li>
                    <Link href="/resources/goal-setting-framework" className="text-primary hover:underline">
                      Effective Goal Setting Framework for Coaches
                    </Link>
                  </li>
                  <li>
                    <Link href="/resources/client-communication" className="text-primary hover:underline">
                      Mastering Client Communication: A Guide for Mentors
                    </Link>
                  </li>
                  <li>
                    <Link href="/resources/career-transition-strategies" className="text-primary hover:underline">
                      Career Transition Strategies: Helping Clients Navigate Change
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl mb-6">Upcoming Webinars</h2>
                <ul className="space-y-4">
                  <li>
                    <Link href="/webinars/ai-in-coaching" className="text-primary hover:underline">
                      Leveraging AI in Coaching Practices
                    </Link>
                    <p className="text-sm text-gray-500">June 15, 2024 - 2:00 PM EST</p>
                  </li>
                  <li>
                    <Link href="/webinars/building-your-brand" className="text-primary hover:underline">
                      Building Your Personal Brand as a Coach
                    </Link>
                    <p className="text-sm text-gray-500">June 22, 2024 - 1:00 PM EST</p>
                  </li>
                  <li>
                    <Link href="/webinars/scaling-your-practice" className="text-primary hover:underline">
                      Scaling Your Coaching Practice: From Solo to Team
                    </Link>
                    <p className="text-sm text-gray-500">June 29, 2024 - 3:00 PM EST</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              Latest from Our Blog
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>The Future of Career Coaching in a Digital World</CardTitle>
                  <CardDescription>May 28, 2024</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Explore how technology is shaping the landscape of career coaching and what it means for professionals in the field.</p>
                  <Link href="/blog/future-of-career-coaching" className="text-primary hover:underline mt-4 inline-block">
                    Read More
                  </Link>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>5 Essential Skills Every Modern Mentor Needs</CardTitle>
                  <CardDescription>May 21, 2024</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Discover the key competencies that set successful mentors apart in today's fast-paced professional environment.</p>
                  <Link href="/blog/essential-mentor-skills" className="text-primary hover:underline mt-4 inline-block">
                    Read More
                  </Link>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Navigating Ethical Dilemmas in Coaching Relationships</CardTitle>
                  <CardDescription>May 14, 2024</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Learn how to address common ethical challenges that arise in coaching and maintain professional integrity.</p>
                  <Link href="/blog/ethical-dilemmas-in-coaching" className="text-primary hover:underline mt-4 inline-block">
                    Read More
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t py-6">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">About</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="hover:underline">Our Story</Link></li>
                <li><Link href="/team" className="hover:underline">Team</Link></li>
                <li><Link href="/careers" className="hover:underline">Careers</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Resources</h4>
              <ul className="space-y-2">
                <li><Link href="/blog" className="hover:underline">Blog</Link></li>
                <li><Link href="/guides" className="hover:underline">Guides</Link></li>
                <li><Link href="/webinars" className="hover:underline">Webinars</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Community</h4>
              <ul className="space-y-2">
                <li><Link href="/forum" className="hover:underline">Forum</Link></li>
                <li><Link href="/events" className="hover:underline">Events</Link></li>
                <li><Link href="/partners" className="hover:underline">Partners</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="hover:underline">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:underline">Terms of Service</Link></li>
                <li><Link href="/cookies" className="hover:underline">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p>&copy; 2024 MentorTown. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

