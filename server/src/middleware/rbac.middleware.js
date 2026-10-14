/**
 * Require that the authenticated user holds at least one of the specified roles.
 * Usage: requireRole('admin', 'super_admin')
 */
export const requireRole = (...roles) =>
  (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Authentication required' });
    }
    const hasRole = req.user.roles?.some((r) => roles.includes(r));
    if (!hasRole) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Required role(s): ${roles.join(', ')}`,
      });
    }
    next();
  };
