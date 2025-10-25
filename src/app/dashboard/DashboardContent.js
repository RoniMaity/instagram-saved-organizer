'use client'
import { useEffect, useState, useCallback } from 'react'
import SavePost from '@/components/SavePost'
import AddPostButton from '@/components/AddPostButton'
import { AbsoluteCenter, Stack, ProgressCircle, Group } from "@chakra-ui/react"
import CategoriesCard from '@/components/CategoriesCard';

export default function DashboardContent({ token }) {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [newUrl, setNewUrl] = useState('')

    const fetchCategories = useCallback(async () => {
        try {
            const res = await fetch('/api/categories', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            const data = await res.json()
            console.log("Fetched Categories Data:", data)
            setCategories(data)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }, [token])

    useEffect(() => {
        fetchCategories()
    }, [fetchCategories])

    const handleSave = async () => {
        setLoading(true)
        if (!newUrl) return
        try {
            const res = await fetch('/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ inputUrl: newUrl })
            })
            if (res.ok) {
                const data = await res.json()
                setNewUrl('')
                console.log("Post saved successfully:", data)
            }
        } catch (err) {
            console.error(err)
        }
    }

    if (loading)
        return (
            <AbsoluteCenter>
                <ProgressCircle.Root value={null} size="xl" colorPalette={{ base: "teal.500", 500: "teal.600" }}>
                    <ProgressCircle.Circle>
                        <ProgressCircle.Track />
                        <ProgressCircle.Range />
                    </ProgressCircle.Circle>
                </ProgressCircle.Root>
            </AbsoluteCenter>
        )

    return (
        <>
            {categories.length === 0 ? (
                <SavePost newUrl={newUrl} setNewUrl={setNewUrl} handleSave={handleSave} />
            ) : (
                <>
                    <AbsoluteCenter>
                        <Stack spacing={4} gap="4" direction="row" wrap="wrap">

                            {categories.map(category => (
                                <CategoriesCard size="sm" key={category.id} category={category.name || 'Uncategorized'}/>
                            ))}

                        </Stack>
                    </AbsoluteCenter>
                    <Stack position="fixed" bottom="4" right="4">
                        <AddPostButton newUrl={newUrl} setNewUrl={setNewUrl} handleSave={handleSave} />
                    </Stack>
                </>
            )}
        </>
    )
}
