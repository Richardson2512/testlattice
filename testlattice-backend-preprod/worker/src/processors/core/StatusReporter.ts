
import { logger } from '../../../observability'
import { StateManager } from '../../../services/StateManager'

export interface StatusDependencies {
    supabase: any
    stateManager?: StateManager
}

export class StatusReporter {
    constructor(
        private runId: string,
        private deps: StatusDependencies
    ) { }

    async updateStatus(status: string, error?: string): Promise<void> {
        if (this.deps.stateManager) {
            await this.deps.stateManager.updateRunStatus(this.runId, status, error)
            return
        }

        try {
            await this.deps.supabase
                .from('test_runs')
                .update({
                    status,
                    error,
                    updated_at: new Date().toISOString(),
                })
                .eq('id', this.runId)
        } catch (e: any) {
            logger.warn({ runId: this.runId, error: e.message }, 'Failed to update status')
        }
    }

    async markStarted(testMode: string, url: string) {
        // Could move more logic here later
        await this.updateStatus('running')
    }
}
