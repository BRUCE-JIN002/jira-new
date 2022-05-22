//TODO id改为number类型

export interface Project {
	id: number;
	name: string;
	pin: boolean;
	personId: number;
	organization: string;
	created: number;
}
