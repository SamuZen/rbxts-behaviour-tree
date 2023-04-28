import { Node } from "../BehaviourTree";
import { Blackboard } from "../Blackboard";
import { NodeStatus } from "../NodeStatus";

export class Selector extends Node {
	children: Node[] = [];

	addChild(child: Node) {
		this.children.push(child);
	}

	tick(blackboard: Blackboard) {
		if (!this.passConditios(blackboard)) {
			this.status = NodeStatus.FAILURE;
			return;
		}

		for (const child of this.children) {
			child.tick(blackboard);
			if (child.status === NodeStatus.SUCCESS) {
				this.status = NodeStatus.SUCCESS;
				return;
			} else if (child.status === NodeStatus.RUNNING) {
				this.status = NodeStatus.RUNNING;
				return;
			}
		}
		this.status = NodeStatus.FAILURE;
	}
}
