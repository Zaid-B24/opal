import { getNotification, onAuthenticateUser } from "@/actions/user"
import { getWorkSpaces, verifyAccessToWorkspace } from "@/actions/workspace"

import { redirect } from "next/navigation"
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
  } from '@tanstack/react-query'
import { Sidebar } from "@/components/ui/sidebar"

type Props = {
    params: {workspaceId: string}
    children: React.ReactNode
}

const Layout = async ({params: {workspaceId}, children}: Props) => {
    const auth = await onAuthenticateUser()
    if (!auth.user?.workspace) redirect('/auth/sign-in')
    if (!auth.user.workspace.length) redirect('/auth/sign-in')
    const hasAccess = await verifyAccessToWorkspace(workspaceId)
  
    if (hasAccess.status !== 200) {
      redirect(`/dashboard/${auth.user?.workspace[0].id}`)
    }
  
    if (!hasAccess.data?.workspace) return null

    const query = new QueryClient()

    await query.prefetchQuery({
        queryKey: ['user-workspaces'],
        queryFn: () => getWorkSpaces(),
      })
    
      await query.prefetchQuery({
        queryKey: ['user-notifications'],
        queryFn: () => getNotification(),
      })

    
    return(
        <HydrationBoundary state={dehydrate(query)}>
            <div className="flex h-screen w-screen">
                <Sidebar>{children}</Sidebar>
            </div>
        </HydrationBoundary>
    )
}

export default Layout