import siteMetadata from '@/data/siteMetadata'
import { PageSEO } from '@/components/SEO'
import ContactForm from '@/components/ContactForm'

export default function GetInTouch() {
  return (
    <>
      <PageSEO
        title={`Contact - ${siteMetadata.author}`}
        description="If you have any questions, feedback, or exciting ideas to share, feel free to reach out!"
      />
      <div className="mx-auto max-w-6xl divide-y divide-gray-400">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Contact
          </h1>
          <p className="text-md leading-7 text-gray-500 dark:text-gray-400">
            If you have any questions, feedback, or exciting ideas to share, feel free to reach out!
          </p>
        </div>

        <div className="container py-8">
          <ContactForm />
        </div>
      </div>
    </>
  )
}
