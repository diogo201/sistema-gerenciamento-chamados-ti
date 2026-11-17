
package com.chamadosti.chamados_service;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/chamados")
public class ChamadoController {

    private final ChamadoRepository repository;

    public ChamadoController(ChamadoRepository repository) {
        this.repository = repository;
    }

    // Listar todos os chamados
    @GetMapping
    public List<Chamado> listar() {
        return repository.findAll();
    }

    // Buscar chamado pelo ID
    @GetMapping("/{id}")
    public ResponseEntity<Chamado> buscar(@PathVariable Long id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Cadastrar novo chamado
    @PostMapping
    public Chamado cadastrar(@RequestBody Chamado chamado) {
        return repository.save(chamado);
    }

    // Atualizar chamado
    @PutMapping("/{id}")
    public ResponseEntity<Chamado> atualizar(
            @PathVariable Long id,
            @RequestBody Chamado dados) {

        return repository.findById(id).map(chamado -> {
            chamado.setTitulo(dados.getTitulo());
            chamado.setDescricao(dados.getDescricao());
            chamado.setPrioridade(dados.getPrioridade());
            chamado.setStatus(dados.getStatus());

            return ResponseEntity.ok(repository.save(chamado));
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Excluir chamado
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        if (!repository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
