import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { addUser } from "../../redux/action/userLoginSlice"

const Login = () => {
  const { register, handleSubmit } = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const users = useSelector((store) => store.users.users)

  const onSubmit = (data) => {
    const existingUser = users.find((user) => data.email === user.email)

    if (existingUser) {
      if (data.password === existingUser.password) {
        dispatch(addUser(existingUser))
        navigate("/home")
        toast.success("Login successful!")
      } else {
        toast.error("Incorrect password.")
      }
    } else {
      toast.error("User not found! Please sign up first.")
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=' max-w-sm mx-auto  mb-4 border border-gray-200 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 p-4 mt-14'>
          <h4 className='text-2xl font-bold dark:text-whit pb-3 text-center'>
            Login Form
          </h4>
          <div className='mb-3'>
            <label
              for='email'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Email
            </label>
            <input
              type='email'
              id='email'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
              placeholder='email'
              {...register("email")}
              required
            />
          </div>
          <div className='mb-3'>
            <label
              for='password'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Password
            </label>
            <input
              type='password'
              id='password'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
              placeholder='password'
              {...register("password")}
              required
            />
          </div>

          <input
            type='submit'
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 align-center'
          ></input>
          <div className='flex items-start p-3'>
            <p
              for='remember'
              className='ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'
            >
              Not a member?{" "}
              <Link to='/signup' className='text-blue-500'>
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Login
