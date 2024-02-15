import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Alert } from '@material-tailwind/react'

const InputField = ({ label, placeholder, register, type = 'text', required }) => (
  <div className="mb-5">
    <input
      type={type}
      placeholder={placeholder}
      className="w-full rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 outline-none invalid:border-red-500 focus:border-sky-500 focus:outline-none
      focus:ring-1 focus:ring-primary-500 focus:invalid:border-red-500 focus:invalid:ring-red-500
      disabled:border-slate-200 disabled:bg-slate-50
      disabled:text-slate-500 disabled:shadow-none"
      {...register(label, { required })}
    />
  </div>
)

const TextAreaField = ({ label, placeholder, register, required }) => (
  <div className="mb-5">
    <textarea
      rows={4}
      placeholder={placeholder}
      className="w-full rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 outline-none invalid:border-red-500 focus:border-sky-500 focus:outline-none
      focus:ring-1 focus:ring-primary-500 focus:invalid:border-red-500 focus:invalid:ring-red-500
      disabled:border-slate-200 disabled:bg-slate-50
      disabled:text-slate-500 disabled:shadow-none"
      {...register(label, { required })}
    />
  </div>
)

function SuccessIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-6 w-6"
    >
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
        clipRule="evenodd"
      />
    </svg>
  )
}

function InfoIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="h-6 w-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
      />
    </svg>
  )
}

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // Add the reset function
  } = useForm()
  const [emailStatus, setEmailStatus] = useState('')

  const sendEmail = async (data) => {
    try {
      const response = await fetch('/api/email/route', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setEmailStatus('success')
      } else {
        const errorData = await response.json()
        setEmailStatus(`error: ${errorData.message}`)
      }
    } catch (error) {
      console.error('Error sending email:', error.message)
      setEmailStatus('error: Please try again.')
    }
  }

  const onSubmit = async (data) => {
    if (Object.keys(errors).length === 0) {
      try {
        await sendEmail(data)
      } catch (error) {
        console.error('Error sending email:', error.message)
      }
    }
  }

  const handleClose = () => {
    setEmailStatus('')
    reset() // Reset the form fields
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputField label="name" placeholder="Full Name" register={register} required />
      {errors.name && (
        <div className="mb-5 flex items-center text-red-500">
          <InfoIcon className="mr-2 h-6 w-6" />
          <span className="ml-1">Name is required.</span>
        </div>
      )}

      <InputField
        label="email"
        placeholder="example@domain.com"
        type="email"
        register={register}
        required
      />
      {errors.email && (
        <div className="mb-5 flex items-center text-red-500">
          <InfoIcon className="mr-2 h-6 w-6" />
          <span className="ml-1">Email is required.</span>
        </div>
      )}

      <TextAreaField label="message" placeholder="Type your message" register={register} required />
      {errors.message && (
        <div className="mb-5 flex items-center text-red-500">
          <InfoIcon className="mr-2 h-6 w-6" />
          <span className="ml-1">Message is required.</span>
        </div>
      )}

      {emailStatus && (
        <div
          className={`mt-4 ${emailStatus.startsWith('error') ? 'text-white' : 'text-green-500'}`}
        >
          <p>
            {emailStatus.startsWith('error') ? (
              `Error: ${emailStatus.substring(7)}`
            ) : (
              <Alert
                icon={<SuccessIcon />}
                className="rounded-none border-l-4 border-[#2ec946] bg-[#2ec946]/10 font-medium text-[#2ec946]"
              >
                <span className="ml-1">The email has been sent successfully. Thank you!</span>
                <button
                  className="absolute right-2 top-2 cursor-pointer p-2 text-[#2ec946] hover:text-black"
                  onClick={handleClose}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </Alert>
            )}
          </p>
        </div>
      )}

      <div className="pt-6">
        <button
          type="submit"
          className="relative flex rounded-xl border-2 border-solid border-gray-800 bg-opacity-20 p-4 transition duration-500 hover:border-primary-500 hover:bg-gray-200 hover:text-primary-500 dark:border-white dark:hover:border-primary-500 dark:hover:bg-gray-800 dark:hover:text-primary-500"
        >
          Submit
        </button>
      </div>
    </form>
  )
}

export default ContactForm
