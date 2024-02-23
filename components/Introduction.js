import Image from '@/components/Image'
import SocialIcon from '@/components/social-icons'
import Link from '@/components/Link'

const Introduction = () => {
  return (
    <div className="mb-12 flex-row gap-x-12">
      <div className="pt-6">
        <div className="space-y-4 ">
          <h1 className="text-foreground text-4xl font-bold sm:text-6xl">
            Hi, I'm Erkan Ege Senli
          </h1>
          <h2 className="text-sm text-gray-500 md:text-base">
            Full-Stack Software Development | Business & Data Analysis
          </h2>
          <p className="sm:text-lg">
            I have an industrial engineering background and keen interest in software development &
            data analysis. I'm eager to continue learning and stay current with the latest web
            technologies. I'm currently expanding my skills in web development, diving into
            technologies like Next.js, React.js, Node.js, Prisma, SQL, and database management.
            Additionally, I am delving into data analysis technologies such as Python, Tableau and
            Power BI to enhance my proficiency and broaden my capabilities.
          </p>
          <div className="flex space-x-3 pt-6">
            <SocialIcon kind="mail" href={`mailto:egesenli@gmail.com`} />
            <SocialIcon kind="github" href={'https://github.com/egesenli'} />
            <SocialIcon kind="linkedin" href={'https://www.linkedin.com/in/erkanegesenli/'} />
            <SocialIcon kind="twitter" href={'https://twitter.com/egesenli'} />
          </div>
        </div>
      </div>
      {/* Separate row for "Get In Touch" and "More About Me" */}
      <div className="flex space-x-3 pt-6">
        <Link href="/about" className="w-40">
          <a className="relative flex divide-x divide-gray-600 rounded-xl border-2 border-solid border-gray-800 bg-opacity-20 p-4 transition duration-500 hover:border-primary-500 hover:bg-gray-200 hover:text-primary-500 dark:border-white dark:hover:border-primary-500 dark:hover:bg-gray-800 dark:hover:text-primary-500">
            More About Me
          </a>
        </Link>
        <Link href="/contact" className="w-40">
          <a className="relative flex justify-center divide-x divide-gray-600 rounded-xl border-2 border-solid border-gray-800 bg-opacity-20 p-4 transition duration-500 hover:border-primary-500 hover:bg-gray-200 hover:text-primary-500 dark:border-white dark:hover:border-primary-500 dark:hover:bg-gray-800 dark:hover:text-primary-500">
            Get In Touch
          </a>
        </Link>
      </div>
    </div>
  )
}

export default Introduction
