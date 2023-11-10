import { AiOutlineMail } from 'react-icons/ai'
import { AiOutlineGithub } from 'react-icons/ai'
import { AiOutlineFacebook } from 'react-icons/ai'
import { AiOutlineTwitter } from 'react-icons/ai'
import { FaLinkedinIn } from 'react-icons/fa'
import { FiExternalLink } from 'react-icons/fi'
import { FaYoutube } from 'react-icons/fa'

// Icons taken from: https://simpleicons.org/

const components = {
  mail: AiOutlineMail,
  github: AiOutlineGithub,
  facebook: AiOutlineFacebook,
  linkedin: FaLinkedinIn,
  twitter: AiOutlineTwitter,
  external: FiExternalLink,
  youtube: FaYoutube,
}

const SocialIcon = ({ kind, href, size = 8 }) => {
  if (!href || (kind === 'mail' && !/^mailto:\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(href)))
    return null

  const SocialSvg = components[kind]

  return (
    <a
      className="text-3xl transition duration-200 hover:text-primary-600"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
    >
      <span className="sr-only">{kind}</span>
      <SocialSvg />
    </a>
  )
}

export default SocialIcon
