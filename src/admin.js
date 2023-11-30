import { currentMember } from 'wix-members-backend';

export function myGetRolesFunction() {
  return currentMember.getRoles()
    .then((roles) => {
      return roles;
    })
    .catch((error) => {
      console.error(error);
    });
}
