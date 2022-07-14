using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query.SqlExpressions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using TecnicaApi.DataAccess.Contexts;
using TecnicaApi.Models.Helpers;

namespace TecnicaApi.DataAccess.Repositories
{
    public class ParadigmaRepository<TEntity> : IParadigmaRepository<TEntity> where TEntity : class, new()
    {
        #region Fields
        public ParadigmaContext _paradigmaContext { get; set; }

        #endregion

        #region Ctor
        public DbSet<TEntity> _entities { get; set; }
        public ParadigmaRepository(ParadigmaContext paradigmaContext)
        {
            _paradigmaContext = paradigmaContext;
            _entities = _paradigmaContext.Set<TEntity>();
        }
        #endregion

        public async Task<bool> Add(TEntity Entitie)
        {
            await _entities.AddAsync(Entitie);
            int changes = await _paradigmaContext.SaveChangesAsync();

            return changes > 0;
        }

        public async Task<bool> AddRange(List<TEntity> Entitie)
        {
            await _entities.AddRangeAsync(Entitie);
            int changes = await _paradigmaContext.SaveChangesAsync();

            return changes > 0;
        }

        public async Task<bool> Delete(TEntity Entitie)
        {
            _entities.Remove(Entitie);
            int changes = await _paradigmaContext.SaveChangesAsync();

            return changes > 0;
        }

        public async Task<bool> DeleteRange(List<TEntity> Entitie)
        {
            _entities.RemoveRange(Entitie);
            int changes = await _paradigmaContext.SaveChangesAsync();

            return changes > 0;
        }

        public async Task<bool> Update(TEntity Entitie)
        {
            _entities.Update(Entitie);
            int changes = await _paradigmaContext.SaveChangesAsync();

            return changes > 0;
        }

        public async Task<bool> UpdateRange(List<TEntity> Entitie)
        {
            _entities.UpdateRange(Entitie);
            int changes = await _paradigmaContext.SaveChangesAsync();

            return changes > 0;
        }

        public async Task<List<TEntity>> List(Expression<Func<TEntity, bool>>? expresion = null)
        {
            List<TEntity> result;
            if (expresion == null)
            {
                result = await _entities.AsNoTracking().ToListAsync();
            }
            else
            {
                result = await _entities.Where(expresion).AsNoTracking().ToListAsync();
            }

            return result;
        }

        /// <summary>
        /// Obtiene un unico registro
        /// </summary>
        /// <param name="expresion"></param>
        /// <returns></returns>
        public async Task<TEntity> ListFirts(Expression<Func<TEntity, bool>>? expresion = null)
        {
            TEntity? result;
            if (expresion == null)
            {
                result = await _entities.AsNoTracking().FirstOrDefaultAsync();
            }
            else
            {
                result = await _entities.Where(expresion).AsNoTracking().FirstOrDefaultAsync();
            }

            return result!;
        }

        public async Task<Pagination<List<TEntity>>> ListPagination(Expression<Func<TEntity, bool>>? expression, int page, int pageSize)
        {
            var skip = (page - 1) * pageSize;
            Pagination<List<TEntity>> pagination;
            if (expression == null)
            {
                pagination = ParadigmaRepository<TEntity>.GetPagination(_entities.Count(), page, pageSize);
                pagination.Values = await _entities.AsNoTracking().Skip(skip).Take(pageSize).ToListAsync();
            }
            else
            {
                var query = _entities.Where(expression);
                pagination = ParadigmaRepository<TEntity>.GetPagination(query.Count(), page, pageSize);
                pagination.Values = await query.Skip(skip).Take(pageSize).AsNoTracking().ToListAsync();
            }

            return pagination;
        }

        public async Task<Pagination<List<TEntity>>> ListPagination(int page, int pageSize)
        {
            var skip = (page - 1) * pageSize;
            Pagination<List<TEntity>> pagination;
            pagination = ParadigmaRepository<TEntity>.GetPagination(_entities.Count(), page, pageSize);
            pagination.Values = await _entities.AsNoTracking().Skip(skip).Take(pageSize).ToListAsync();

            return pagination;
        }

        private static Pagination<List<TEntity>> GetPagination(int RowCount, int page, int pageSize)
        {
            Pagination<List<TEntity>> Paginated = new Pagination<List<TEntity>>();

            Paginated.PageSize = pageSize;
            Paginated.CurrentPage = page;
            Paginated.RowCount = RowCount;

            double pageCount = (double)Paginated.RowCount / pageSize;
            Paginated.PageCount = (int)Math.Ceiling(pageCount);

            return Paginated;
        }
    }
}
