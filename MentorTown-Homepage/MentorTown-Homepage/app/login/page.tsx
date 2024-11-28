'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { FaGoogle, FaLinkedin } from 'react-icons/fa'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    // Here you would typically make an API call to your authentication service
    // For demonstration, we'll just check if the email and password are not empty
    if (email && password) {
      // Simulate a successful login
      router.push('/dashboard')
    } else {
      setError('Please enter both email and password.')
    }
  }

  const handleSocialLogin = (provider: string) => {
    // Implement social login logic here
    console.log(`Logging in with ${provider}`)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight">Sign in to MentorTown</CardTitle>
          <CardDescription>
            Enter your email and password to access your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" onClick={() => handleSocialLogin('Google')}>
              <FaGoogle className="mr-2 h-4 w-4" />
              Google
            </Button>
            <Button variant="outline" onClick={() => handleSocialLogin('LinkedIn')}>
              <FaLinkedin className="mr-2 h-4 w-4" />
              LinkedIn
            </Button>
          </div>
          <div className="text-center text-sm">
            <Link href="/forgot-password" className="text-primary hover:underline">
              Forgot your password?
            </Link>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm">
            Don't have an account?{' '}
            <Link href="/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </div>
          <div className="rounded-lg bg-muted p-4 text-sm">
            <h3 className="mb-2 font-semibold">Benefits of logging in:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Access your personalized dashboard</li>
              <li>Manage your clients and appointments</li>
              <li>Participate in community discussions</li>
              <li>Access exclusive resources and tools</li>
            </ul>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

