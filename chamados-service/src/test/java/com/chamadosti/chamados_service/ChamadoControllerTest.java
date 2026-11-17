
package com.chamadosti.chamados_service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.List;

import org.junit.jupiter.api.Test;

public class ChamadoControllerTest {

    @Test
    void deveListarChamados() {

        // Criar um repositorio simulado
        ChamadoRepository repository = mock(ChamadoRepository.class);

        // Criar um chamado para o teste
        Chamado chamado = new Chamado();

        chamado.setTitulo("Computador sem internet");
        chamado.setDescricao("Usuario nao consegue acessar a rede");
        chamado.setPrioridade("Alta");
        chamado.setStatus("Aberto");

        // Simular o retorno do banco de dados
        when(repository.findAll()).thenReturn(List.of(chamado));

        // Criar o controller
        ChamadoController controller = new ChamadoController(repository);

        // Executar a listagem
        List<Chamado> resultado = controller.listar();

        // Verificar se retornou corretamente
        assertEquals(1, resultado.size());

        assertEquals(
            "Computador sem internet",
            resultado.get(0).getTitulo()
        );

        assertEquals(
            "Aberto",
            resultado.get(0).getStatus()
        );
    }
}
