import { Button } from "@/components/ui/button"
import { MenuIcon, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"



const LandingPageNavbar = () => {
return(
    <div className="flex w-full justify-between items-center">
        <div className="text-3xl font font-semibold flex items-center gap-x-3">
            <MenuIcon className="w-8 h-8" />
            <Image src="/opal-logo.svg"
            alt="logo" 
            width={40}
            height={40}/>
            Opal
        </div>
        <div className="hidden gap-x-10 items-center lg:flex">
            <Link href='/' className="bg-[#7320DD] py-2 px-5 font-semibold text-lg rounded-full hover::bg-[7320DD]/80">Home</Link>
            <Link href='/'>Pricing</Link>
            <Link href='/'>Contact</Link>
        </div>
        <Link href='/auth/sign-in'>
            <Button className="text-base flex gap-x-2"><User fill="#000"></User>Login</Button>
        </Link>
    </div>
)
}

export default LandingPageNavbar