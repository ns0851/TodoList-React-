const Navbar = () => {
  return (
    <nav className='flex justify-between bg-slate-800 text-white text-xl items-center p-6'>
        <div className="logo font-bold text-2xl mx-5 ">
            myLister
        </div>
      <ul className="flex gap-8">
        <li className='hover:font-bold cursor-pointer transition-all'>Home</li>
        <li className='hover:font-bold cursor-pointer transition-all'>Your Tasks</li>
      </ul>
    </nav>
  )
}

export default Navbar