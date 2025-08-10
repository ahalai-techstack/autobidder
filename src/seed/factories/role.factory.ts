import { Role } from '../../modules/role/role.entity';
import { setSeederFactory } from 'typeorm-extension';

export default setSeederFactory(Role, (faker) => {
  const role = new Role();
  role.name = faker.person.jobTitle();
  role.description = faker.lorem.sentence();
  return role;
});
