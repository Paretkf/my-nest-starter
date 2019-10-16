import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'

export const authorStampCreatePlugin = schema => {
  schema.pre('save', function(next) {
    const { email, id } = JwtAuthGuard.getAuthorizedUser()
    this.updatedBy = {
      id,
      email
    }
    if (this.isNew) {
      this.createdBy = {
        id,
        email
      }
    }

    next()
  })

  schema.pre('findOneAndUpdate', function(next) {
    const { email, id } = JwtAuthGuard.getAuthorizedUser()
    this._update.updatedBy = {
      id,
      email
    }

    next()
  })

  schema.pre('update', function(next) {
    const { email, id } = JwtAuthGuard.getAuthorizedUser()
    this._update.updatedBy = {
      id,
      email
    }

    next()
  })
}
