// Guest flow - quick start for unauthenticated users
import { JobData, TestRunStatus, ProcessResult } from '../../types'
import { TestProcessor } from '../testProcessor'
import { RunnerSession } from '../../runners/playwright'

export class GuestFlow {
  constructor(private processor: TestProcessor) {}

  /**
   * Execute guest test flow (skip diagnosis, auto-approve, 10-step limit)
   */
  async executeGuestTest(runId: string, jobData: JobData): Promise<ProcessResult> {
    console.log(`[${runId}] Starting guest test flow (skipDiagnosis=true, maxSteps=10)`)
    
    // Guest tests skip diagnosis and go straight to execution
    // They have a 10-step limit and auto-approve all actions
    // Use the standard process method which will handle skipDiagnosis properly
    return await (this.processor as any).process(jobData)
  }
}

