using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using TecnicaApi.DataAccess.Contexts;
using TecnicaApi.Models.Helpers;

namespace TecnicaApi.DataAccess.Repositories
{
    public interface IParadigmaRepository<TEntity> where TEntity : class, new()
    {
        DbSet<TEntity> _entities { get; set; }
        ParadigmaContext _paradigmaContext { get; set; }

        Task<bool> Add(TEntity Entitie);
        Task<bool> AddRange(List<TEntity> Entitie);
        Task<bool> Delete(TEntity Entitie);
        Task<bool> DeleteRange(List<TEntity> Entitie);
        Task<bool> Update(TEntity Entitie);
        Task<bool> UpdateRange(List<TEntity> Entitie);
        Task<List<TEntity>> List(Expression<Func<TEntity, bool>>? expresion = null);
        Task<TEntity> ListFirts(Expression<Func<TEntity, bool>>? expresion = null);
        Task<Pagination<List<TEntity>>> ListPagination(Expression<Func<TEntity, bool>>? expression, int page, int pageSize);
        Task<Pagination<List<TEntity>>> ListPagination(int page, int pageSize);
    }
}