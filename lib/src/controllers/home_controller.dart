import 'package:vaden/vaden.dart';

@Controller('/')
class HomeController {
  @Get('/')
  String home() {
    return 'Olá Mundo!';
  }
}
