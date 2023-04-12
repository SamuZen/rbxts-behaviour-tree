export class Blackboard {
	private variables: Map<string, unknown> = new Map();

	public setVariable(name: string, value: unknown): void {
		this.variables.set(name, value);
	}

	public getVariable(name: string): unknown {
		return this.variables.get(name);
	}
}
