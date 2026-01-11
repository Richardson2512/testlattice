
import { TestStep, TestRunExertion, ProcessResult } from '../types'

export class ExertionCalculator {

    /**
     * Calculates the exertion/confidence level of a test run
     * Answers: "Did we try hard enough?"
     */
    public calculate(
        steps: TestStep[],
        startTime: number,
        endTime: number,
        finalStatus: 'success' | 'failed'
    ): TestRunExertion {
        const durationMs = endTime - startTime

        // 1. Gather raw metrics
        const pagesVisited = new Set(steps.map(s => s.metadata?.url || s.metadata?.pageUrl).filter(Boolean)).size
        const formsInteracted = steps.filter(s => s.action === 'type' || s.action === 'click').length // Proxy for interaction
        const scrollActions = steps.filter(s => s.action === 'scroll').length

        // 2. Calculate Confidence Score (0-100)
        // A linear combination of signals, capped at 100
        // - Steps: nice to have > 10
        // - Unique Pages: nice to have > 2
        // - Duration: nice to have > 30s

        let score = 0
        score += Math.min(steps.length * 2, 50) // Max 50 pts for steps (25 steps = max)
        score += Math.min(pagesVisited * 15, 30) // Max 30 pts for exploration (2 pages = 30)
        score += Math.min(durationMs / 1000, 20) // Max 20 pts for duration (20s = max)

        // Bonus for meaningful interactions
        if (formsInteracted > 3) score += 10

        // Cap at 100
        score = Math.min(Math.round(score), 100)

        // 3. Determine Level
        let level: TestRunExertion['confidenceLevel'] = 'low'
        if (score >= 80) level = 'high'
        else if (score >= 40) level = 'medium'

        // Special Case: Errors reduce confidence? 
        // Actually, if we found an error, we have High Confidence that it's broken.
        // Exertion measures "Effort to find bugs". 
        // If we failed early (e.g. step 2), confidence in "Safety" is LOW.
        // If result is "success", but score is low -> Low Confidence Pass (WARNING)
        // If result is "failed", confidence doesn't matter as much (we found something).

        // 4. Termination Reason
        // In a real implementation this would come from the processor state, inferring for now
        let reason: TestRunExertion['terminationReason'] = 'complete'
        if (finalStatus === 'failed') reason = 'error'
        if (steps.length === 0) reason = 'blocked'

        return {
            totalSteps: steps.length,
            pagesVisited: Math.max(pagesVisited, 1), // At least 1 (entry)
            formsInteracted,
            scrollingDistance: scrollActions * 1000, // Estimate
            totalDurationMs: durationMs,
            confidenceScore: score,
            confidenceLevel: level,
            terminationReason: reason
        }
    }
}
