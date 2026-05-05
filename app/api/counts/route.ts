import { NextResponse } from 'next/server'
import { getCountsByJurusan } from '@/lib/api'

export async function GET() {
    try {
        const counts = await getCountsByJurusan()
        return NextResponse.json(counts)
    } catch (error) {
        console.error('[API Route] Error fetching counts:', error)
        return NextResponse.json({}, { status: 500 })
    }
}
