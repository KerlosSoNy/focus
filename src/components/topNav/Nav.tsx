import { Link } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { IoMdPerson } from "react-icons/io";

export default function Nav() {
    return (
        <div className="flex flex-row w-[98.7vw] items-center justify-center">
            <div className="flex flex-row
            justify-between
            gap-4 p-2 px-6 my-5 rounded-2xl w-2/3">
                <Link to='/' title="Home" className="hover:scale-110 duration-700">
                    <IoMdHome className="text-3xl" />
                </Link>
                <Link to='/profile' title="Profile" className="hover:scale-110 duration-700">
                    <IoMdPerson className="text-3xl" />
                </Link>
            </div>
        </div>
    )
}
