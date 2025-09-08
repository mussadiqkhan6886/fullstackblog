import SideBar from "@/components/adminComponents/SideBar";

export default function Layout({children}: {children: React.ReactNode}) {
    return (
        <>
            <div className="flex ">
                <SideBar />
            </div>
            {children}
        </>
    )
}