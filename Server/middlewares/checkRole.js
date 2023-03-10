const ROLE = {
  USER: 0,
  ADMIN: 1,
  SELLER: 2,
  VISITOR: 3,
};

function checkRole({ minRole }) {
  return function checkRoleMiddleware(req, res, next) {
    const userRole = req.user.role;
    console.log(userRole, minRole);
    if (ROLE[userRole] >= minRole) {
      next();
    } else {
      throw new super(403);
    }
  };
}

checkRole.ROLE = ROLE;

module.exports = checkRole;