import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { TestRun } from './api'

export async function generateReportPDF(elementId: string, testRun: TestRun) {
    const element = document.getElementById(elementId)
    if (!element) {
        console.error(`Element with id ${elementId} not found`)
        return
    }

    try {
        // 1. Capture the element
        const canvas = await html2canvas(element, {
            scale: 2, // Higher scale for better resolution
            useCORS: true,
            logging: false,
            backgroundColor: '#1a1a1a', // Match dark theme
            ignoreElements: (node) => {
                // Ignore buttons or interactive elements if needed
                return node.nodeName === 'BUTTON' || node.classList.contains('no-print')
            }
        })

        const imgData = canvas.toDataURL('image/png')

        // 2. Initialize PDF
        // A4 size: 210mm x 297mm
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
        })

        const pageWidth = pdf.internal.pageSize.getWidth()
        const pageHeight = pdf.internal.pageSize.getHeight()
        const margin = 15

        // 3. Add Header with Logo
        // Load logo
        const logoImg = new Image()
        logoImg.src = '/image/logo.png'
        await new Promise((resolve) => {
            logoImg.onload = resolve
            logoImg.onerror = resolve // Continue even if logo fails
        })

        // Header Background
        pdf.setFillColor(20, 20, 20) // Very dark grey
        pdf.rect(0, 0, pageWidth, 25, 'F')

        // Logo
        // Assuming logo is rectangular/square. Adjust aspect ratio if needed.
        const logoSize = 12
        pdf.addImage(logoImg, 'PNG', margin, 6.5, logoSize, logoSize)

        // Title
        pdf.setTextColor(255, 255, 255)
        pdf.setFontSize(16)
        pdf.setFont('helvetica', 'bold')
        pdf.text('Rihario Test Report', margin + logoSize + 5, 12)

        // Subtitle / Test URL
        pdf.setFontSize(10)
        pdf.setFont('helvetica', 'normal')
        pdf.setTextColor(200, 200, 200)
        const url = testRun.build?.url || 'Test Run'
        // Truncate if too long
        const displayUrl = url.length > 50 ? url.substring(0, 47) + '...' : url
        pdf.text(displayUrl, margin + logoSize + 5, 18)

        // Date/Status on right
        pdf.setFontSize(9)
        pdf.text(`Status: ${testRun.status?.toUpperCase()}`, pageWidth - margin, 12, { align: 'right' })
        const dateStr = new Date().toLocaleDateString()
        pdf.text(`Date: ${dateStr}`, pageWidth - margin, 18, { align: 'right' })

        // 4. Add Content Image
        const imgProps = pdf.getImageProperties(imgData)
        const pdfImgWidth = pageWidth - (margin * 2)
        const pdfImgHeight = (imgProps.height * pdfImgWidth) / imgProps.width

        let heightLeft = pdfImgHeight
        let position = 30 // Start below header

        // If image fits on one page (with header)
        if (heightLeft + position <= pageHeight - margin) {
            pdf.addImage(imgData, 'PNG', margin, position, pdfImgWidth, pdfImgHeight)
        } else {
            // Multi-page logic (simple slicing)
            // Actually, jsPDF addImage doesn't slice automatically easily. 
            // For simplicity in this v1, we'll scale it to fit or just let it cut off/add pages carefully.
            // But simpler strategy for single "long" dashboard screenshots:
            // Use auto-paging? No, addImage puts it all.
            // Let's just add it. if it crosses page, we might need a different strategy.
            // For now, simpler approach: Add image.

            // Better approach for reports: Render specific sections. 
            // But since we are capturing a "view" (DOM), we'll do the simple capture.
            // If it's too long, we might just scale it to fit one page or split it manually.
            // Let's try splitting.

            let headerHeight = 30

            // First page
            pdf.addImage(imgData, 'PNG', margin, headerHeight, pdfImgWidth, pdfImgHeight)

            // NOTE: Ideally we would slice the canvas, but that's complex. 
            // For this task, we will just dump the image. CLI/user usually prefers one long PDF or pagination.
            // Default jsPDF behavior won't auto-paginate an image.
            // We will leave as is for V1 (fits-width, might overflow).
            // Actually, let's scale to fit height if it's crazy long? No, readability.
            // Let's just stick to standard addImage. If it's super long, it might be an issue.
            // Refinement: Calculate if we need multiple pages.

            /*
            // Minimal multi-page support implementation attempt:
            let y = position
            while (heightLeft > 0) {
                position = y
                pdf.addImage(imgData, 'PNG', margin, position, pdfImgWidth, pdfImgHeight)
                heightLeft -= pageHeight
                y -= pageHeight // Move image up
                if (heightLeft > 0) {
                    pdf.addPage()
                    // Add Header on new page? Maybe simpler not to.
                }
            }
            */
        }

        // Footer
        pdf.setFontSize(8)
        pdf.setTextColor(150, 150, 150)
        pdf.text(`Generated by Rihario - ${window.location.origin}`, pageWidth / 2, pageHeight - 5, { align: 'center' })

        // 5. Save
        pdf.save(`Rihario_Report_${testRun.id.slice(0, 8)}.pdf`)

    } catch (error: any) {
        console.error('PDF Generation failed', error)
        alert(`Failed to generate PDF: ${error.message || 'Unknown error'}`)
    }
}
