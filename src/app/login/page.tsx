export default function Login() {
    return (
        <form className="w-full h-screen flex items-center *:w-[350px] justify-center flex-col gap-[12px]">
            <h1 className="text-3xl font-bold">Log In</h1>
            <input
                className="bg-gray-900 text-white p-[10px] rounded-[8px]"
                name="name"
                placeholder="John Doe"
            />
            <input
                className="bg-gray-900 text-white p-[10px] rounded-[8px]"
                name="email"
                placeholder="111111@lwsd.org"
                type="email"
            />
            <input
                className="bg-gray-900 text-white p-[10px] rounded-[8px]"
                name="password"
                type="password"
            />
            <button type="submit" className="bg-purple-500 text-white font-bold p-[10px] rounded-[8px]">Log In</button>
        </form>
    )
}