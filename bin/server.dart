import 'dart:io';

import 'package:clone_tabnews/vaden_application.dart';

Future<void> main(List<String> args) async {
  final port = Platform.environment['PORT'] ?? '8080';
  
  final vaden = VadenApp();
  await vaden.setup();
  final server = await vaden.run([...args, '--port', port]);
  print('Server listening on port ${server.port}');
}

