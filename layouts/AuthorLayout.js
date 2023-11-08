import SocialIcon from '@/components/social-icons' // Import your SocialIcon component
import Image from '@/components/Image'
import { PageSEO } from '@/components/SEO'

export default function AuthorLayout({ children, frontMatter }) {
  const { name, avatar, occupation, email, twitter, linkedin, github } = frontMatter

  return (
    <>
      <PageSEO title={`About - ${name}`} description={`About me - ${name}`} />
      <div className="pt-8">
        <div className="mb-8 flex flex-col-reverse items-center justify-between sm:flex-row sm:items-center">
          <div className="pt-8 text-center sm:text-left">
            <h1 className="text-xl font-bold md:text-3xl lg:text-4xl">{name}</h1>
            <h2 className="text-sm font-normal md:text-base">
              {occupation} <span className="font-semibold"></span>
            </h2>
          </div>
          <div>
            <Image
              alt={name}
              height={140}
              width={140}
              src={avatar || ''}
              className="rounded-full object-cover grayscale"
            />
            <div className="flex space-x-3 pt-6">
              <SocialIcon kind="mail" href={`mailto:${email}`} />
              <SocialIcon kind="github" href={github} />
              <SocialIcon kind="linkedin" href={linkedin} />
              <SocialIcon kind="twitter" href={twitter} />
            </div>
          </div>
        </div>
        <div className="prose max-w-none pb-8 text-justify text-sm dark:prose-dark md:text-lg xl:col-span-2">
          {children}
        </div>
      </div>
    </>
  )
}
