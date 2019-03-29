import { Role } from "discord.js";
import { DubiousBot } from "..";

export default (role: Role, client: DubiousBot) => {
	return new Promise<void>((resolve, reject) => {
		let config = client.fetchConfig(role.guild)
		
		if (config.adminRoles.delete(role.id) || config.assignableRoles.delete(role.id))
			client.saveConfig(role.guild.id)

		if (!config.enableLogger)
			return resolve()

		//TODO log

		return resolve()
	})

}