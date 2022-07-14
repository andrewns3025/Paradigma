using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TecnicaApi.Models.Entities;

namespace TecnicaApi.DataAccess.Contexts
{
    public partial class ParadigmaContext : DbContext
    {
        private readonly string _connectionStrings;

        public ParadigmaContext(IConfiguration configuration)
        {
            _connectionStrings = configuration.GetConnectionString("Paradigma");
        }

        public virtual DbSet<AndrewNorenaPokemonlist> AndrewNorenaPokemonlists { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.EnableSensitiveDataLogging();
                optionsBuilder.UseSqlServer(_connectionStrings);
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AndrewNorenaPokemonlist>(entity =>
            {
                entity.HasKey(e => e.PokemonId)
                    .HasName("PK__AndrewNo__69C4E92321DC5B6D");

                entity.ToTable("AndrewNorenaPokemonlist");

                entity.Property(e => e.PokemonId).ValueGeneratedNever();

                entity.Property(e => e.Abilities).IsUnicode(false);

                entity.Property(e => e.CreationDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Locations).IsUnicode(false);

                entity.Property(e => e.ModificationDate).HasColumnType("datetime");

                entity.Property(e => e.Moves).IsUnicode(false);

                entity.Property(e => e.Name)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.UrlImage)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.VideoId)
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
