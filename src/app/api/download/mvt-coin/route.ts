import { NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { join } from 'path'

export async function GET() {
  try {
    // publicフォルダのファイルパスを指定
    const filePath = join(process.cwd(), 'public', 'mvt_coin_32×32.svg')

    // ファイルを読み込み
    const fileBuffer = await readFile(filePath)

    // レスポンスを作成（Content-Dispositionヘッダーを付与してダウンロードさせる）
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Content-Disposition': 'attachment; filename="mvt_coin_32x32.svg"',
      },
    })
  } catch (error) {
    console.error('File download error:', error)
    return NextResponse.json(
      { error: 'File not found' },
      { status: 404 }
    )
  }
}
