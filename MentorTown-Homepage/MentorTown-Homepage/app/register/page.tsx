'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { FaGoogle, FaLinkedin } from 'react-icons/fa'
import ReCAPTCHA from 'react-google-recaptcha'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const [certifications, setCertifications] = useState('')
  const [expertise, setExpertise] = useState('')
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [error, setError] = useState('')
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null)
  const router = useRouter()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!recaptchaValue) {
      setError('Please complete the CAPTCHA.')
      return
    }
    if (!agreeTerms) {
      setError('Please agree to the terms and conditions.')
      return
    }
    // Here you would typically make an API call to your registration service
    // For demonstration, we'll just check if all required fields are filled
    if (name && email && password && role) {
      // Simulate a successful registration
      console.log('Registration successful:', { name, email, role, certifications, expertise })
      router.push('/registration-success')
    } else {
      setError('Please fill in all required fields.')
    }
  }

  const handleSocialRegister = (provider: string) => {
    // Implement social registration logic here
    console.log(`Registering with ${provider}`)
  }

  const passwordStrength = (password: string) => {
    const strengthChecks = [
      password.length >= 8,
      /[A-Z]/.test(password),
      /[a-z]/.test(password),
      /[0-9]/.test(password),
      /[^A-Za-z0-9]/.test(password)
    ]
    return strengthChecks.filter(Boolean).length
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-2xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight">Create your MentorTown account</CardTitle>
          <CardDescription>
            Join our community of mentors and start your journey today
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
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
              <div className="h-2 w-full bg-gray-200 rounded-full mt-2">
                <div
                  className={`h-full rounded-full ${
                    passwordStrength(password) === 5 ? 'bg-green-500' :
                    passwordStrength(password) >= 3 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${passwordStrength(password) * 20}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500">Password strength: {
                passwordStrength(password) === 5 ? 'Strong' :
                passwordStrength(password) >= 3 ? 'Medium' : 'Weak'
              }</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select onValueChange={setRole} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="counselor">Counselor</SelectItem>
                  <SelectItem value="career-coach">Career Coach</SelectItem>
                  <SelectItem value="organization">Organization</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="certifications">Professional Certifications (Optional)</Label>
              <Input
                id="certifications"
                placeholder="e.g., ICF ACC, NCDA CCSP"
                value={certifications}
                onChange={(e) => setCertifications(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expertise">Areas of Expertise (Optional)</Label>
              <Input
                id="expertise"
                placeholder="e.g., Career Transition, Leadership Development"
                value={expertise}
                onChange={(e) => setExpertise(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" checked={agreeTerms} onCheckedChange={(checked) => setAgreeTerms(checked as boolean)} />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to the{' '}
                <Link href="/terms" className="text-primary hover:underline">
                  terms and conditions
                </Link>
              </label>
            </div>
            <ReCAPTCHA
              sitekey="YOUR_RECAPTCHA_SITE_KEY"
              onChange={(value) => setRecaptchaValue(value)}
            />
            {error && (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or register with
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" onClick={() => handleSocialRegister('Google')}>
              <FaGoogle className="mr-2 h-4 w-4" />
              Google
            </Button>
            <Button variant="outline" onClick={() => handleSocialRegister('LinkedIn')}>
              <FaLinkedin className="mr-2 h-4 w-4" />
              LinkedIn
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-center text-sm text-gray-600 mt-2">
            Already have an account?{' '}
            <Link href="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

