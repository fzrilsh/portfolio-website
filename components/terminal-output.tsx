"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExternalLink, Github, Mail, Linkedin, Phone } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import {
  aboutData,
  experienceData,
  skillsData,
  achievementsData,
  projectsData,
  educationData,
  contactData,
} from "@/lib/data"

interface TerminalOutputProps {
  type: string
}

export default function TerminalOutput({ type }: TerminalOutputProps) {
  switch (type) {
    case "help":
      return (
        <div className="pl-4 text-yellow-300" role="region" aria-label="Help commands">
          <p className="mb-2">Available commands:</p>
          <ul className="space-y-1">
            <li>
              <span className="text-green-400">help</span> - Show available commands
            </li>
            <li>
              <span className="text-green-400">about</span> - Display information about me
            </li>
            <li>
              <span className="text-green-400">experience</span> - Show my work experience
            </li>
            <li>
              <span className="text-green-400">skills</span> - List my technical skills
            </li>
            <li>
              <span className="text-green-400">achievements</span> - Display my awards and achievements
            </li>
            <li>
              <span className="text-green-400">projects</span> - Show my projects
            </li>
            <li>
              <span className="text-green-400">education</span> - Show my educational background
            </li>
            <li>
              <span className="text-green-400">contact</span> - Display my contact information
            </li>
            <li>
              <span className="text-green-400">clear</span> - Clear the terminal
            </li>
            <li>
              <span className="text-green-400">all</span> - Show all information
            </li>
          </ul>
        </div>
      )

    case "about":
      return (
        <div className="pl-4" role="region" aria-label="About me">
          <div className="mb-4 flex flex-col md:flex-row gap-4 items-center">
            <div className="relative rounded-full overflow-hidden border-2 border-green-500">
              <Image
                src="/profile-picture.jpeg"
                alt="Fazril Syaveral Hillaby"
                width={128}
                height={128}
                className="object-cover rounded-full"
              />
            </div>
            <div>
              <h2 className="text-xl font-bold text-green-400 mb-2">{aboutData.name}</h2>
              <h3 className="text-lg text-green-300 mb-4">{aboutData.title}</h3>
              <div className="text-gray-300 space-y-2">
                {aboutData.description.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )

    case "experience":
      return (
        <div className="pl-4 space-y-6" role="region" aria-label="Work experience">
          {experienceData.map((job, index) => (
            <div key={index} className="border border-gray-800 p-4 rounded-md bg-gray-900 bg-opacity-50">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
                <div>
                  <h3 className="text-lg font-bold text-green-400">{job.title}</h3>
                  <p className="text-green-300">
                    {job.company} | {job.type}
                  </p>
                </div>
                <p className="text-gray-400">{job.period}</p>
              </div>
              <ul className="list-disc pl-5 space-y-1 text-gray-300">
                {job.responsibilities.map((responsibility, respIndex) => (
                  <li key={respIndex}>{responsibility}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )

    case "skills":
      return (
        <div className="pl-4" role="region" aria-label="Technical skills">
          <Tabs defaultValue="programming" className="w-full">
            <TabsList className="bg-gray-900 border border-gray-800 overflow-x-auto flex-wrap">
              {Object.keys(skillsData).map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="data-[state=active]:bg-green-900 data-[state=active]:text-green-300"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
            {Object.entries(skillsData).map(([category, skills]) => (
              <TabsContent key={category} value={category} className="mt-4">
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <Badge key={index} className="bg-gray-800 hover:bg-gray-700 text-green-400 border border-green-900">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      )

    case "achievements":
      return (
        <div className="pl-4 space-y-6" role="region" aria-label="Achievements and awards">
          {achievementsData.map((achievement, index) => (
            <div
              key={index}
              className={`border-l-4 ${achievement.medal === "Gold" ? "border-l-yellow-500" : "border-l-gray-400"} p-4 bg-gray-900 bg-opacity-50 rounded-r-md`}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
                <div>
                  <h3 className="text-lg font-bold text-green-400">{achievement.title}</h3>
                  <p className="text-green-300">
                    {achievement.organization} | {achievement.category}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={`${achievement.medal === "Gold" ? "bg-yellow-500" : "bg-gray-400"} text-black`}>
                    {achievement.medal} Medal
                  </Badge>
                  <p className="text-gray-400">{achievement.date}</p>
                </div>
              </div>
              <p className="text-gray-300 mb-3">{achievement.description}</p>
              {achievement.projects && (
                <div>
                  <h4 className="font-semibold text-green-300 mb-2">Project Highlights:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-300">
                    {achievement.projects.map((project, projIndex) => (
                      <li key={projIndex}>{project}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )

    case "projects":
      return (
        <div className="pl-4" role="region" aria-label="Projects">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projectsData.map((project, index) => (
              <Card key={index} className="bg-gray-900 border-gray-800 overflow-hidden">
                <div className="relative h-40 w-full">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover opacity-70"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-green-400">{project.title}</CardTitle>
                  <CardDescription className="text-gray-300">{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="outline" className="border-green-900 text-green-400">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href={project.liveUrl}
                      target="_blank"
                      className="flex items-center gap-1 text-sm text-green-400 hover:text-green-300"
                      aria-label={`View live demo of ${project.title}`}
                    >
                      <ExternalLink className="h-4 w-4" /> Live Demo
                    </Link>
                    <Link
                      href={project.githubUrl}
                      target="_blank"
                      className="flex items-center gap-1 text-sm text-green-400 hover:text-green-300"
                      aria-label={`View source code of ${project.title}`}
                    >
                      <Github className="h-4 w-4" /> Code
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )

    case "education":
      return (
        <div className="pl-4 space-y-6" role="region" aria-label="Education">
          {educationData.map((edu, index) => (
            <div key={index} className="border border-gray-800 p-4 rounded-md bg-gray-900 bg-opacity-50">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
                <div>
                  <h3 className="text-lg font-bold text-green-400">{edu.degree}</h3>
                  <p className="text-green-300">{edu.institution}</p>
                </div>
                <p className="text-gray-400">{edu.period}</p>
              </div>
              {edu.details && <p className="text-gray-300 mt-2">{edu.details}</p>}
              {edu.gpa && <p className="text-gray-300 mt-2">{edu.gpa}</p>}
            </div>
          ))}
        </div>
      )

    case "contact":
      return (
        <div className="pl-4" role="region" aria-label="Contact information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-green-400">Contact Information</CardTitle>
                <CardDescription className="text-gray-300">
                  Feel free to reach out through any of these channels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactData.channels.map((channel, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="bg-green-900 bg-opacity-30 p-2 rounded-full shrink-0">
                      {channel.icon === "mail" && <Mail className="h-5 w-5 text-green-400" aria-hidden="true" />}
                      {channel.icon === "github" && <Github className="h-5 w-5 text-green-400" aria-hidden="true" />}
                      {channel.icon === "linkedin" && (
                        <Linkedin className="h-5 w-5 text-green-400" aria-hidden="true" />
                      )}
                      {channel.icon === "phone" && (
                        <Phone className="h-5 w-5 text-green-400" aria-hidden="true" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-green-300">{channel.name}</h3>
                      <Link href={channel.url} target="_blank" className="text-gray-400 hover:text-green-400 break-all block w-full">
                        {channel.display}
                      </Link>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-green-400">Location</CardTitle>
                <CardDescription className="text-gray-300">Based in</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">{contactData.location}</p>
                <div className="mt-4 border border-gray-800 rounded-md p-2 bg-black bg-opacity-50">
                  <pre className="text-xs text-green-400 overflow-x-auto">
                    {`
$ ping ${contactData.location.replace(/,/g, "").replace(/ /g, "-").toLowerCase()}.com
PING ${contactData.location.replace(/,/g, "").replace(/ /g, "-").toLowerCase()}.com 56 data bytes
64 bytes from ${contactData.location.split(",")[0]}: icmp_seq=0 ttl=50 time=89.8 ms
64 bytes from ${contactData.location.split(",")[0]}: icmp_seq=1 ttl=50 time=84.2 ms
64 bytes from ${contactData.location.split(",")[0]}: icmp_seq=2 ttl=50 time=92.1 ms
`}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )

    case "all":
      return (
        <div className="space-y-8" role="region" aria-label="All information">
          <div>
            <h2 className="text-xl font-bold text-green-400 mb-4">About Me</h2>
            <TerminalOutput type="about" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-green-400 mb-4">Experience</h2>
            <TerminalOutput type="experience" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-green-400 mb-4">Skills</h2>
            <TerminalOutput type="skills" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-green-400 mb-4">Achievements</h2>
            <TerminalOutput type="achievements" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-green-400 mb-4">Projects</h2>
            <TerminalOutput type="projects" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-green-400 mb-4">Education</h2>
            <TerminalOutput type="education" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-green-400 mb-4">Contact</h2>
            <TerminalOutput type="contact" />
          </div>
        </div>
      )

    default:
      if (type.startsWith("Command not found")) {
        return <div className="pl-4 text-red-400">{type}</div>
      }
      return null
  }
}
